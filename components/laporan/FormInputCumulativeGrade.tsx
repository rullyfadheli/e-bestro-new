"use client";

import React from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  required?: boolean;
  className?: string;
}

// Context
import { useReport, useProgressBar } from "@/context/store";

function FormInputCumulativeGrade({
  label,
  placeholder,
  type = "text",
  // value,
  required,
  className = "",
}: FormInputProps) {
  const { cumulativeGradeIndex, updateCumulativeGradeIndex } = useReport();
  const { progress, updateProgress } = useProgressBar();

  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    if (Boolean(cumulativeGradeIndex && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.2, 1));
      isHasValue.current = true;
    }

    if (Boolean(!cumulativeGradeIndex && isHasValue.current)) {
      updateProgress(Math.min(progress - 0.2, 1));
      isHasValue.current = false;
    }
  }, [cumulativeGradeIndex, progress, updateProgress]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = Number(event.target.value);
    updateCumulativeGradeIndex(data);
  }
  return (
    <div className={className}>
      <label className="block text-sm mb-1 font-medium text-gray-700">
        {label} {required && <span className="text-gray-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={cumulativeGradeIndex ?? ""}
        required={required}
        onChange={(event) => handleChange(event)}
        className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}

export default FormInputCumulativeGrade;
