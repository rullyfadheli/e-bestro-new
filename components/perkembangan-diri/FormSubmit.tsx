"use client";

import React, { JSX } from "react";
import { useProgressBar, useEvaluation } from "@/context/store";

// supabase
import { createClient } from "@/utils/supabase/client";

// database
import { uploadSelfProgression } from "@/lib/users";

function FormSubmit(): JSX.Element {
  const { updateProgress } = useProgressBar();
  const {
    academicProgress,
    updateAcademicProgress,
    challenges,
    updateChallenges,
    nonAcademicEvaluation,
    updateNonAcademicEvaluation,
    solvingChallenge,
    updateSolvingChallenge,
    academicTarget,
    updateAcademicTarget,
    nonAcademicTarget,
    updateNonAcademicTarget,
    strategy,
    updateStrategy,
  } = useEvaluation();

  async function handleSubmit(): Promise<void> {
    if (
      !academicProgress ||
      !challenges ||
      !nonAcademicEvaluation ||
      !solvingChallenge ||
      !academicTarget ||
      !nonAcademicTarget ||
      !strategy
    ) {
      alert("Mohon lengkapi semua isian sebelum melanjutkan.");
      return;
    }

    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const user_id = data?.user?.id;

    if (user_id === undefined) {
      alert("User tidak ditemukan, Silakan hubungi admin.");
      return;
    }

    const uploadSelfProgressionError = await uploadSelfProgression({
      academicProgress,
      challenges,
      nonAcademicEvaluation,
      solvingChallenge,
      academicTarget,
      nonAcademicTarget,
      strategy,
      user_id,
    });
    if (uploadSelfProgressionError) {
      alert(
        `${uploadSelfProgressionError}. Silakan refresh halaman & coba lagi.`
      );
      return;
    }
    updateProgress(0);
  }

  function handleReset(): void {
    updateProgress(0);
    // Reset evaluation state
    updateAcademicProgress("");
    updateChallenges("");
    updateNonAcademicEvaluation("");
    updateSolvingChallenge("");
    updateAcademicTarget("");
    updateNonAcademicTarget("");
    updateStrategy("");
  }

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleReset}
        className="border border-secondary text-secondary px-6 py-2 rounded mr-4"
      >
        Kembali
      </button>
      <button
        onClick={handleSubmit}
        className="bg-secondary text-white px-6 py-2 rounded"
      >
        Finalisasi
      </button>
    </div>
  );
}

export default FormSubmit;
