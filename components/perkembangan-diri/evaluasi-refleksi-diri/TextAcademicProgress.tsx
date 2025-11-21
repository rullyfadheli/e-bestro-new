"use client";

import React, { JSX } from "react";

//context
import { useEvaluation, useProgressBar } from "@/context/store";

function TextAcademicProgress(): JSX.Element {
  const { academicProgress, updateAcademicProgress } = useEvaluation();
  const { progress, updateProgress } = useProgressBar();

  React.useEffect(() => {});
  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    if (Boolean(academicProgress && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.2, 1));
      isHasValue.current = true;
    }

    if (!academicProgress && isHasValue.current) {
      updateProgress(Math.max(progress - 0.2, 0));
      isHasValue.current = false;
    }
  }, [academicProgress, progress, updateProgress]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const data = event.target.value;
    updateAcademicProgress(data);
  }
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Refleksi Diri atas Progres Akademik
      </label>
      <textarea
        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
        placeholder="Jelaskan apakah perkembangan akademik sesuai target: Apakah IPK meningkat/menurun? Mata kuliah mana yang berkontribusi pada IPK tinggi/rendah? Apakah berhasil mengikuti rencana belajar?"
        onChange={(e) => handleChange(e)}
        value={academicProgress || ""}
        maxLength={300}
      />
    </div>
  );
}

export default TextAcademicProgress;
