import { supabase } from '@/lib/supabase'; // Your Supabase client

interface ParentData {
  first_name: string;
  last_name: string;
  email: string | null;
  phone_number: string | null;
  relationship: string;
}

export const insertParents = async (studentId: string, parentData: {
  Father: ParentData;
  Mother: ParentData;
  Guardian: ParentData;
}) => {
  try {
    // Preparing the data for bulk insert
    const parentsToInsert = [
      {
        student_id: studentId,
        first_name: parentData.Father.first_name,
        last_name: parentData.Father.last_name,
        email: parentData.Father.email,
        phone_number: parentData.Father.phone_number,
        relationship: "Father", // Relationship is fixed for Father
      },
      {
        student_id: studentId,
        first_name: parentData.Mother.first_name,
        last_name: parentData.Mother.last_name,
        email: parentData.Mother.email,
        phone_number: parentData.Mother.phone_number,
        relationship: "Mother", // Relationship is fixed for Mother
      },
      {
        student_id: studentId,
        first_name: parentData.Guardian.first_name,
        last_name: parentData.Guardian.last_name,
        email: parentData.Guardian.email,
        phone_number: parentData.Guardian.phone_number,
        relationship: "Guardian", // Relationship is fixed for Guardian
      }
    ];

    // Insert parents data in bulk
    console.log('parentsToInsert: ',parentsToInsert)
    const { data, error } = await supabase
      .from('parent') // Replace with your table name
      .upsert(parentsToInsert, { onConflict: 'student_id,relationship' }); // Ensure no duplicates based on student_id and relationship

    if (error) {
      throw error;
    }

    console.log('Parent data saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error saving parent data:', error);
    throw new Error('Failed to save parent data');
  }
};


export const getParents = async (
  studentId: string // The studentId for whom we want to fetch the parent(s)
) => {
  try {
    // Call the appropriate stored procedure for fetching parents
    const rpcName = `get_parents_by_student`;

    // Create the parameters object
    const parameters = {
      p_student_id: studentId // The studentId that links to the parents
    };

    const { data, error } = await supabase.rpc(rpcName, parameters);
    console.log(`data get: ${studentId}:`, data);
    if (error) {
      console.error(`Error fetching parents for student ${studentId}:`, error);
      return [];
    }

    return data; // Return the list of parent data
  } catch (error) {
    console.error(`Error fetching parents for student ${studentId}:`, error);
    return [];
  }
};
