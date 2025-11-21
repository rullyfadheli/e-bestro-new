"use client";

import React, { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { getStudentProfile } from "@/lib/users";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Components
import TitleBanner from "@/components/utils/TitleBanner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/utils/app-sidebar";
import InputField from "@/components/profile/inputField";
import { createClient } from "@/utils/supabase/client";

// --- Types ---
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

type StudentData = StudentItem[];

// --- Main Component ---
function Profile(): JSX.Element {
  const [profile, setProfile] = useState<StudentData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for button

  const supabase = createClient();
  const router = useRouter();

  // Fetch Data Logic
  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await supabase.auth.getUser();
      const currentUserId = userData.data.user?.id;

      if (!currentUserId) {
        toast.error("Akses Ditolak", {
          description: "User ID tidak ditemukan. Silakan login kembali.",
          duration: 4000,
        });
        setTimeout(() => router.push("/login"), 2000);
        return;
      }
      setUserId(currentUserId);

      const data = await getStudentProfile(currentUserId);

      if (Array.isArray(data)) {
        setProfile(data);
      } else {
        toast.error("Gagal memuat data profil");
      }
    };

    fetchProfile();
  }, [supabase, router]);

  /**
   * Updates the local state when inputs change.
   */
  const handleInputChange = (field: keyof StudentItem, value: string) => {
    if (!profile) return;
    const updatedProfile = [...profile];
    if (updatedProfile[0]) {
      updatedProfile[0] = {
        ...updatedProfile[0],
        [field]: value,
      };
      setProfile(updatedProfile);
    }
  };

  /**
   * Validates data and calls the update service.
   */
  const handleSubmit = async () => {
    if (!profile || !profile[0] || !userId) {
      toast.warning("Data profil tidak valid atau belum dimuat.");
      return;
    }

    setIsSubmitting(true); // Start loading

    const check = await supabase
      .from("student")
      .select("*")
      .eq("user_id", userId);
    console.log(check);

    const payload = {
      name: profile[0].name,
      gender: profile[0].gender,
      birthDate: profile[0].birthDate,
      university: profile[0].university,
      faculty: profile[0].faculty,
      department: profile[0].department,
    };
    console.log(userId);
    console.log(payload);
    try {
      const { data, error } = await supabase
        .from("student")
        .update(payload)
        .eq("user_id", userId)
        .select();

      if (error) {
        console.log(error);
        throw error;
      }

      console.log(data);

      toast.success("Update data berhasil!", {
        description: "Profil Anda telah diperbarui di database.",
      });
    } catch (error: unknown) {
      console.error("Update error:", error);
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan server.";
      toast.error("Gagal memperbarui data!", {
        description: message,
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <SidebarProvider>
      <Toaster position="top-center" richColors />

      <AppSidebar />
      <main className="w-full min-h-screen pb-8 bg-mainBG relative">
        <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />

        <TitleBanner
          title="Profil Mahasiswa"
          subTitle="Informasi pribadi dan data BESTRO yang dapat dilihat atau diperbarui oleh penerima."
        />

        <section className="px-6 md:px-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-36 h-36">
                <Image
                  src={
                    profile
                      ? profile[0]?.profilePicture || "/profile.jpg"
                      : "/profile.jpg"
                  }
                  alt="Profile"
                  width={144}
                  height={144}
                  className="rounded-full object-cover border-4 border-primary"
                />
                <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100 transition-colors">
                  <FiEdit3 className="text-gray-700 w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-center md:text-left">
                <h2 className="text-xl font-bold text-gray-800 uppercase">
                  {profile ? profile[0]?.name : "Loading..."}
                </h2>
                <p className="text-sm text-gray-600">
                  {profile ? profile[0]?.studentID : "..."} / Penerima BESTRO
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="w-full gap-6 mt-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-black border-b pb-2 mb-4">
                Profile BESTRO
              </h3>

              <div className="space-y-4 text-sm text-gray-600">
                <InputField
                  label="Nama Lengkap"
                  value={profile ? profile[0]?.name : ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                {/* Gender Selection (Radio) */}
                <div className="mb-2">
                  <label className="block text-xs text-gray-500 mb-2">
                    Jenis Kelamin
                  </label>
                  <div className="flex flex-row gap-6">
                    {["Laki-laki", "Perempuan"].map((genderOption) => (
                      <label
                        key={genderOption}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={genderOption}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-primary checked:bg-primary transition-all"
                            checked={profile?.[0]?.gender === genderOption}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                          />
                          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {genderOption}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <InputField
                  label="Tempat/Tanggal Lahir"
                  value={profile ? profile[0]?.birthDate ?? "" : ""}
                  onChange={(e) =>
                    handleInputChange("birthDate", e.target.value)
                  }
                />
                <InputField
                  label="Universitas"
                  value={profile ? profile[0]?.university : ""}
                  onChange={(e) =>
                    handleInputChange("university", e.target.value)
                  }
                />
                <InputField
                  label="Fakultas"
                  value={profile ? profile[0]?.faculty : ""}
                  onChange={(e) => handleInputChange("faculty", e.target.value)}
                />
                <InputField
                  label="Program Studi"
                  value={profile ? profile[0]?.department : ""}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <div className="w-full py-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !profile}
                className={`
                  flex items-center justify-center gap-2 py-3 px-8 rounded-md text-white font-medium transition-all
                  ${
                    isSubmitting || !profile
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-secondary hover:bg-secondary/90 shadow-md active:scale-95"
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}

export default Profile;
