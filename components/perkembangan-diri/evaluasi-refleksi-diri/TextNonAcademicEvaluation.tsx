"use client";

import React, { JSX } from "react";

// context
import { useEvaluation, useProgressBar } from "@/context/store";
function TextNonAcademicEvaluation(): JSX.Element {
  const { progress, updateProgress } = useProgressBar();
  const { nonAcademicEvaluation, updateNonAcademicEvaluation } =
    useEvaluation();

  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    if (Boolean(nonAcademicEvaluation && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.2, 1));
      isHasValue.current = true;
    }

    if (!nonAcademicEvaluation && isHasValue.current) {
      updateProgress(Math.max(progress - 0.2, 0));
      isHasValue.current = false;
    }
  }, [nonAcademicEvaluation, progress, updateProgress]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const data = event.target.value;
    updateNonAcademicEvaluation(data);
  }
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Refleksi Diri atas Pengembangan Non-Akademik
      </label>
      <textarea
        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
        placeholder="Ceritakan kegiatan di luar akademik (organisasi, lomba, volunteer). Apa peran yang diambil? Apa pelajaran yang diperoleh?"
        onChange={(e) => handleChange(e)}
        value={nonAcademicEvaluation || ""}
        maxLength={300}
      />
    </div>
  );
}

export default TextNonAcademicEvaluation;
