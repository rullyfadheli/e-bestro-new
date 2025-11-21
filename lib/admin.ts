"use server";
import { createClient } from "@/utils/supabase/server";

async function uploadImageToBucket(fileName: string, file: File) {
  const supabase = await createClient();
  const { error } = await supabase.storage
    .from("profile-picture")
    .upload(fileName, file);

  if (error) {
    return error;
  }

  return;
}

export { uploadImageToBucket };
