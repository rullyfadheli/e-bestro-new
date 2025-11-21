"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// signing out user
async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out failed:", error);
    return error.message;
  }

  redirect("/login");
}

// ------------------ getting ---------------------

// getting grade target by user_id
async function getGradeTarget(user_id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gradeTarget")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching grade target:", error);
    return error;
  }
}

// getting student name by user_id
async function getStudentNameById(user_id: string) {
  try {
    const supabase = await createClient();
    // console.log(user_id);
    const { data, error } = await supabase
      .from("student")
      .select("name")
      .eq("user_id", user_id);

    if (error) throw error;
    // console.log(data);
    // console.log(error);
    return data;
  } catch (error) {
    console.error("Error fetching student name:", error);
    return error;
  }
}

// getting all student data by user_id
async function getStudentData(user_id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("student")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.log(error);
      throw new Error("Gagal memuat data");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}

// Fetching scholarship approval data
async function getScholarshipApproval(user_id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("scholarshipApproval")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching scholarship approval:", error);
    return error;
  }
}

type StudentData = {
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
}[];

async function getStudentProfile(
  user_id: string
): Promise<StudentData | string | undefined> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("student")
      .select("*, image(*)")
      .eq("user_id", user_id);

    if (error) {
      throw new Error("Gagal mengambil data profil Mahasiswa");
    }
    if (!data || data.length === 0) {
      throw new Error("Data profil Mahasiswa tidak ditemukan");
    }

    const fileName = data[0]?.image?.[0]?.fileName as string;
    // console.log("File name:", fileName);
    const profilePicture = await supabase.storage
      .from("profile-picture")
      .createSignedUrl(`avatars/${fileName}`, 60 * 60 * 24 * 7);

    // console.log(profilePicture.data?.signedUrl);

    const updatedData = data.map((student) => ({
      ...student,
      profilePicture: profilePicture.data?.signedUrl,
    }));

    // console.log("Updated data:", updatedData);

    return updatedData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error.message as string;
    }
  }
}

type Achievement = {
  id: string;
  name: string;
  year: number;
  organizer: string;
  level: string;
  user_id: number;
}[];

async function getAchievement(
  user_id: string
): Promise<Achievement | string | undefined> {
  try {
    if (!user_id) {
      throw new Error("Terjadi kesalahan, silakan login kembali");
    }
    // console.log(user_id);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("achievement")
      .select("*")
      .eq("user_id", user_id);
    if (error) {
      throw new Error("Gagal memuat data, silakan coba beberapa saat lagi");
    }

    if (data.length === 0 || !data) {
      throw new Error("Data tidak ditemukan");
    }
    // console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return error.message;
    }
  }
}

// ------------------ uploading ---------------------

// uploading payment PDF document to DB
async function uploadPaymentDocument(
  file: File,
  user_id: string
): Promise<string | void> {
  try {
    const supabase = await createClient();
    if (file?.type !== "application/pdf") {
      throw new Error("File must be a PDF");
    }

    // checking the file size
    const allowedFileSize = 5 * 1024 * 1024; // 5 MB
    if (file?.size > allowedFileSize) {
      throw new Error("File size exceeds 5 MB");
    }

    // recreating file name
    const fileName = file.name.split(".")[0] + Date.now() + ".pdf";

    // registering file name to DB based on user_id
    const sendFileNameToDB = await supabase
      .from("document")
      .insert({
        pdf: fileName,
      })
      .eq("user_id", user_id);

    if (sendFileNameToDB.error) {
      throw new Error("Gagal mengunggah file, silakan coba beberapa saat lagi");
    }

    const { error } = await supabase.storage
      .from("document-bucket")
      .upload(`pdf/${fileName}`, file);

    if (error) {
      console.log(error);
      throw new Error("File sudah ada di database");
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}

// uploading grade PDF document to DB
async function uploadGradeDocument(file: File, user_id: string) {
  try {
    const supabase = await createClient();
    if (file?.type !== "application/pdf") {
      throw new Error("File must be a PDF");
    }

    const allowedFileSize = 5 * 1024 * 1024; // 5 MB

    if (file?.size > allowedFileSize) {
      throw new Error("ukuran file melebihi 5 MB");
    }

    const sendFileNameToDB = supabase
      .from("document")
      .insert({
        pdf: file.name,
      })
      .eq("user_id", user_id);

    if ((await sendFileNameToDB) instanceof Error) {
      throw new Error("File sudah ada di database");
    }

    const { error } = await supabase.storage
      .from("document-bucket")
      .upload(`pdf/${file.name}`, file);

    if (error) {
      throw new Error("File sudah ada di database");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return error;
    }
  }
}

// uploading grade report to DB
async function uploadGradeReport({
  semester,
  gradeIndex,
  cumulativeGradeIndex,
  paymentDate,
  user_id,
}: {
  semester: number;
  gradeIndex: number;
  cumulativeGradeIndex: number;
  paymentDate: string;
  user_id: string;
}): Promise<void | Error> {
  try {
    if (
      semester === null ||
      gradeIndex === null ||
      cumulativeGradeIndex === null ||
      paymentDate === ""
    ) {
      throw new Error("Mohon lengkapi semua field sebelum mengirim.");
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("gradeReport")
      .insert({
        semester,
        gradeIndex,
        cumulativeGradeIndex,
        paymentDate,
        user_id,
      })
      .eq("user_id", user_id);

    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gagal mengunggah:", error);
      return error;
    }
  }
}

async function uploadSelfProgression({
  academicProgress,
  challenges,
  nonAcademicEvaluation,
  solvingChallenge,
  academicTarget,
  nonAcademicTarget,
  strategy,
  user_id,
}: {
  academicProgress: string;
  challenges: string;
  nonAcademicEvaluation: string;
  solvingChallenge: string;
  academicTarget: string;
  nonAcademicTarget: string;
  strategy: string;
  user_id: string;
}): Promise<string | void> {
  const supabase = await createClient();
  try {
    if (
      !academicProgress ||
      !challenges ||
      !nonAcademicEvaluation ||
      !solvingChallenge ||
      !academicTarget ||
      !nonAcademicTarget ||
      !strategy
    ) {
      throw new Error("Mohon lengkapi semua field sebelum mengirim.");
    }
    const { error } = await supabase.from("selfProgression").insert({
      academicProgress,
      challenges,
      nonAcademicEvaluation,
      solvingChallenge,
      academicTarget,
      nonAcademicTarget,
      strategy,
      user_id,
    });

    if (error) {
      console.log(error);
      throw new Error("Gagal mengunggah data perkembangan diri");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading self progression:", error);
      return error?.message;
    }
  }
}

async function uploadAchievementFile(
  user_id: string,
  file: File
): Promise<void | string> {
  try {
    // error handling file before upload
    if (!file) throw new Error("Tidak ada file yang dipilih");
    if (file.type !== "application/pdf") {
      throw new Error("Hanya diizinkan mengunggah file PDF");
    }

    // checking the file size
    const allowedFileSize = 5 * 1024 * 1024; // 5 MB

    if (file?.size > allowedFileSize) {
      throw new Error("ukuran file melebihi 5 MB");
    }

    // changing the file name to be unique
    const fileName = file.name.split(".")[0] + Date.now() + ".pdf";
    console.log(fileName);

    // uploading the file
    const supabase = await createClient();
    const { error } = await supabase.storage
      .from("document-bucket")
      .upload(`pdf/${fileName}`, file);

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    // registering file name to DB
    const uploadFIleName = await supabase
      .from("document")
      .insert(fileName)
      .eq("user_id", user_id);

    if (uploadFIleName?.error) {
      console.log(uploadFIleName.error);
      throw new Error("Gagal mengunggah file");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return error.message;
    }
  }
}

type AchievementData = {
  achievementName: string;
  achievementLevel: string;
  acquiredYear: number;
  organizer: string;
  user_id: string;
};

// uploading achievement data to DB, then it will be checked by admin
async function uploadAchievementData({
  achievementName,
  achievementLevel,
  acquiredYear,
  organizer,
  user_id,
}: AchievementData): Promise<string | void> {
  try {
    if (!user_id) {
      return "Terjadi kesalahan, silakan login kembali";
    }

    if (!achievementLevel || !achievementName || !acquiredYear || !organizer) {
      return "Silakan lengkapi semua field sebelum mengirim";
    }
    const supabase = await createClient();
    const { error } = await supabase
      .from("pendingAchievement")
      .insert({
        name: achievementName,
        year: acquiredYear,
        organizer,
        level: achievementLevel,
        user_id,
      })
      .eq("user_id", user_id);

    if (error) {
      console.log(error);
      throw new Error("Gagal mengunggah data, silakan coba beberapa saat lagi");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return error.message;
    }
  }
}

export {
  signOut,
  getStudentProfile,
  getGradeTarget,
  getStudentNameById,
  getScholarshipApproval,
  getStudentData,
  getAchievement,
  uploadGradeDocument,
  uploadPaymentDocument,
  uploadGradeReport,
  uploadSelfProgression,
  uploadAchievementFile,
  uploadAchievementData,
};
