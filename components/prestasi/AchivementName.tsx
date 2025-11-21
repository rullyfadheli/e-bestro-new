"use client";
import React, { JSX } from "react";

// Context
import { useProgressBar, useAchievement } from "@/context/store";

function AchivementName(): JSX.Element {
  const { achievementName, updateAchievementName } = useAchievement();
  const { progress, updateProgress } = useProgressBar();
  const toggle = React.useRef<boolean>(true);

  function handleChange(value: string): void {
    updateAchievementName(value);
  }

  React.useEffect(() => {
    if (achievementName && toggle.current) {
      updateProgress(progress + Math.min(0.2, 1));
      toggle.current = false;
      console.log("set false");
    }

    if (achievementName === "" || (!achievementName && !toggle)) {
      updateProgress(progress - Math.min(0.2, 1));
      toggle.current = true;
    }
  }, [achievementName, progress, updateProgress]);

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700">
        {/* {required && <span className="text-gray-500">*</span>} */}
      </label>
      <h5 className="text-[#5E6366] font-inter ">
        Nama Prestasi atau Penghargaan
      </h5>
      <input
        type="text"
        placeholder="Detail Nama Prestasi atau Penghargaan"
        value={achievementName ? achievementName : ""}
        onChange={(event) => handleChange(event.target.value as string)}
        required={true}
        className="w-full bg-[#EFF1F9] text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}

export default AchivementName;
