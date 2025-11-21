"use client";

import React, { JSX } from "react";

// context
import { useProgressBar, useAchievement } from "@/context/store";

function AcquiredYear(): JSX.Element {
  const { progress, updateProgress } = useProgressBar();
  const { acquiredYear, updateAcquiredYear } = useAchievement();

  const toggle = React.useRef<boolean>(true);

  React.useEffect(() => {
    function handleProgressBar(): void {
      if (acquiredYear && toggle.current) {
        updateProgress(progress + Math.min(0.2, 1));
        toggle.current = false;
      } else if (!acquiredYear && !toggle.current) {
        updateProgress(progress - Math.min(0.2, 1));
        toggle.current = true;
      }
    }

    handleProgressBar();
  }, [acquiredYear, progress, updateProgress]);

  function handleChange(value: number): void {
    updateAcquiredYear(value);
  }
  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700">
        {/* {required && <span className="text-gray-500">*</span>} */}
      </label>
      <h5 className="text-[#5E6366] font-inter ">Tahun Perolehan</h5>
      <input
        type="number"
        placeholder="Tahun Perolehan"
        value={acquiredYear ? acquiredYear : ""}
        onChange={(event) => handleChange(Number(event.target.value) as number)}
        required={true}
        className="w-full bg-[#EFF1F9] text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}

export default AcquiredYear;
