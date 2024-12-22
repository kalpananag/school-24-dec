import { supabase } from '@/lib/supabase'; // Import your Supabase client

interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
}

export const insertTeacherAddress = async (
  teacherId: string,
  addressData: Address,
  addressType: 'home' | 'office' | 'other'
) => {
  try {
    // Start a transaction to insert the address and relationship
    const { data: addressDataInsert, error: addressInsertError } = await supabase
      .rpc('insert_teacher_address', {
        teacher_id: teacherId,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        zip_code: addressData.zip_code,
        phone_number: addressData.phone_number,
        address_type: addressType,
      });

    if (addressInsertError) {
      console.log('Error in inserting address for teacher', addressInsertError)
      throw addressInsertError; // Handle error if the insert fails
    }

    return addressDataInsert; // Return the inserted address data (optional)
  } catch (error) {
    console.error('Error inserting teacher address:', error);
    throw new Error('Failed to insert teacher address');
  }
};
export const getTeacherAddresses = async (teacherId: string) => {
  const { data, error } = await supabase
    .rpc('get_teacher_addresses', { p_teacher_id: teacherId });

  if (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }

  return data;
};