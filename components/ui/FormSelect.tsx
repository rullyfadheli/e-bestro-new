"use client";
import React from "react";

//context
import { useProgressBar, useReport } from "@/context/store";

interface FormSelectProps {
  label: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export function FormSelect({
  label,
  options,
  value,
  onChange,
  required,
}: FormSelectProps) {
  const { progress, updateProgress } = useProgressBar();
  const { semester, updateSemester } = useReport();

  const hasUpdatedProgress = React.useRef(false);

  React.useEffect(() => {
    // Only update progress once when semester is set and progress hasn't been updated yet
    if (semester && !hasUpdatedProgress.current) {
      updateProgress(Math.min(progress + 0.1, 1)); // Ensure progress doesn't exceed 1
      hasUpdatedProgress.current = true;
    }
  }, [semester, progress, updateProgress]);

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-gray-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => {
          updateSemester(Number(e.target.value));
          onChange?.(e);
        }}
        required={required}
        className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
      >
        <option value="">Pilih {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
