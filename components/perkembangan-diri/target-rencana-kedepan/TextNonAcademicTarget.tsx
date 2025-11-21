"use client";

import React, { JSX } from "react";

// context
import { useEvaluation, useProgressBar } from "@/context/store";
function TextNonAcademicTarget(): JSX.Element {
  const { progress, updateProgress } = useProgressBar();
  const { nonAcademicTarget, updateNonAcademicTarget } = useEvaluation();

  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    if (Boolean(nonAcademicTarget && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.1, 1));
      isHasValue.current = true;
    }

    if (!nonAcademicTarget && isHasValue.current) {
      updateProgress(Math.max(progress - 0.1, 0));
      isHasValue.current = false;
    }
  }, [nonAcademicTarget, progress, updateProgress]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const data = event.target.value;
    updateNonAcademicTarget(data);
  }
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Target Non-Akademik untuk Semester Depan
      </label>
      <textarea
        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md bg-white text-sm shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
        placeholder="Tulis target kontribusi sosial atau pengembangan diri non-akademik: menjadi ketua organisasi, partisipasi proyek sosial, lulus TOEFL, dsb."
        onChange={(e) => handleChange(e)}
        value={nonAcademicTarget || ""}
        maxLength={300}
      />
    </div>
  );
}

export default TextNonAcademicTarget;
