import { supabase } from '@/lib/supabase'; // Import your Supabase client

interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
}

export const insertAddress = async (
  entityId: string,
  entityType: 'teacher' | 'student' | 'staff' | 'course',
  addressData: Address,
  addressType: 'home' | 'temp' | 'other'
) => {
  try {
    // Call the appropriate stored procedure based on the entity type
    const rpcName = `insert_${entityType}_address`;
    // Dynamically set the id name
    const keyName = `${entityType}_id`;  // This will become 'p_teacher_id'

    // Create the parameters object
    const parameters = {
      [keyName]: entityId,  // The customized entityId value
      'street': addressData.street,
        'city': addressData.city,
        'state': addressData.state,
        'zip_code': addressData.zip_code,
        'phone_number': addressData.phone_number,
        'address_type': addressType,

    };
    const { data: addressDataInsert, error: addressInsertError } = await supabase
      .rpc(rpcName, parameters
      //   {
      //   entity_id: entityId,
      //   street: addressData.street,
      //   city: addressData.city,
      //   state: addressData.state,
      //   zip_code: addressData.zip_code,
      //   phone_number: addressData.phone_number,
      //   address_type: addressType,
      // }
      );

    if (addressInsertError) {
      console.log(`Error in inserting address for ${entityType}`, addressInsertError);
      throw addressInsertError; // Handle error if the insert fails
    }

    return addressDataInsert; // Return the inserted address data (optional)
  } catch (error) {
    console.error(`Error inserting ${entityType} address:`, error);
    throw new Error(`Failed to insert ${entityType} address`);
  }
};

export const getAddresses = async (
  entityId: string,
  entityType: 'teacher' | 'student' | 'staff' | 'course'
) => {
  try {
    // Call the appropriate stored procedure based on the entity type
    const rpcName = `get_${entityType}_addresses`;
    
    // Dynamically set the id name
    const keyName = `p_${entityType}_id`;  // This will become 'p_teacher_id'

    // Create the parameters object
    const parameters = {
      [keyName]: entityId  // The customized entityId value
    };

    const { data, error } = await supabase.rpc(rpcName, parameters);//{ p_teacher_id: entityId });

    if (error) {
      console.error(`Error fetching ${entityType} addresses:`, error);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${entityType} addresses:`, error);
    return [];
  }
};
