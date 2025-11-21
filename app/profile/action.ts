import { createClient } from "@/utils/supabase/client";

// Re-using your type definition
type StudentItem = {
  id: string;
  created_at: string;
  name: string;
  studentID: string;
  university: string;
  department: string;
  faculty: string;
  user_id: string;
  birthDate: string | null;
  gender: string | null;
  image: {
    created_at: string;
    fileName: string;
    id: string;
    user_id: string;
  }[];
  profilePicture: string;
};

/**
 * Updates the student data in Supabase.
 */
export const updateStudentData = async (
  userId: string,
  data: Partial<StudentItem>
) => {
  const supabase = createClient();

  try {
    const { data: result, error } = await supabase
      .from("student")
      .update(data)
      .eq("user_id", userId)
      .select();

    if (error) throw error;

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error };
  }
};
