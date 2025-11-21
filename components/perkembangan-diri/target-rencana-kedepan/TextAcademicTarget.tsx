"use client";

import React, { JSX } from "react";

// context
import { useEvaluation, useProgressBar } from "@/context/store";
function TextAcademicTarget(): JSX.Element {
  const { progress, updateProgress } = useProgressBar();
  const { academicTarget, updateAcademicTarget } = useEvaluation();

  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    if (Boolean(academicTarget && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.2, 1));
      isHasValue.current = true;
    }

    if (!academicTarget && isHasValue.current) {
      updateProgress(Math.max(progress - 0.2, 0));
      isHasValue.current = false;
    }
  }, [academicTarget, progress, updateProgress]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const data = event.target.value;
    updateAcademicTarget(data);
  }
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Target Akadmik untuk Semester Depan
      </label>
      <textarea
        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md bg-white text-sm shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
        placeholder="Tulis target IPK berikutnya dan tujuan akademik lain seperti ikut konferensi, lomba ilmiah, magang akademik, dll."
        onChange={(e) => handleChange(e)}
        value={academicTarget || ""}
        maxLength={300}
      />
    </div>
  );
}

export default TextAcademicTarget;
