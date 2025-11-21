"use client";

import React, { JSX } from "react";

// context
import { useProgressBar, useAchievement } from "@/context/store";

// supabase
import { createClient } from "@/utils/supabase/client";
import { uploadAchievementData, uploadAchievementFile } from "@/lib/users";
function Submit(): JSX.Element {
  const { updateProgress } = useProgressBar();

  const {
    achievementName,
    updateAchievementName,
    achievementLevel,
    updateAchievementLevel,
    acquiredYear,
    updateAcquiredYear,
    organizer,
    updateOrganizer,
    achievementFile,
    updateAchievementFile,
  } = useAchievement();

  async function handleSubmit(): Promise<void> {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;

    if (
      !achievementLevel ||
      !achievementName ||
      !acquiredYear ||
      !organizer ||
      !achievementFile
    ) {
      alert("Silakan lengkapi semua field sebelum mengirim");
      return;
    }

    if (!user_id) {
      alert("Terjadi kesalahan, silakan login kembali");
      return;
    }

    const uploadDataError = await uploadAchievementData({
      achievementName,
      achievementLevel,
      acquiredYear,
      organizer,
      user_id,
    });

    if (uploadDataError) {
      alert(
        "Gagal mengunggah data, silakan refresh dan coba beberapa saat lagi"
      );
      return;
    }

    const uploadFileError = await uploadAchievementFile(
      user_id,
      achievementFile
    );
    if (uploadFileError) {
      alert(
        "Gagal mengunggah bukti file, silakan refresh dan coba beberapa saat lagi"
      );
      return;
    }
    handleRemoveValue();
    alert("Upload berhasil");
  }

  function handleRemoveValue(): void {
    // remove all values of the fields
    updateAchievementName(null);
    updateAchievementLevel(null);
    updateAcquiredYear(null);
    updateOrganizer(null);
    updateAchievementFile(null);

    // set progress bar to 0
    updateProgress(0);
  }
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => {
          handleRemoveValue();
        }}
        className="bg-primary text-white hover:text-secondary border rounded-lg border-primary py-2 px-11"
      >
        Batal
      </button>
      <button
        onClick={() => {
          handleSubmit();
        }}
        className="bg-secondary text-white hover:text-primary border rounded-lg border-secondary py-2 px-11"
      >
        Submit
      </button>
    </div>
  );
}

export default Submit;
