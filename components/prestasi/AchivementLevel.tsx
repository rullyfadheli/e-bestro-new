"use client";

import React, { JSX } from "react";
import { useAchievement, useProgressBar } from "@/context/store";
import Image from "next/image";

function AchievementLevel(): JSX.Element {
  const { achievementLevel, updateAchievementLevel } = useAchievement();
  const { progress, updateProgress } = useProgressBar();
  const [toggle, setToggle] = React.useState<boolean>(false);

  const hasUpdatedProgress = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (hasUpdatedProgress.current && achievementLevel) {
      updateProgress(Math.min(progress + 0.2, 1));
      hasUpdatedProgress.current = false;
    }

    if (!hasUpdatedProgress.current && !achievementLevel) {
      updateProgress(progress - Math.min(0.2, 1));
    }
  }, [achievementLevel, progress, updateProgress]);

  // console.log(progress);

  return (
    <div className="relative ">
      <h5
        onClick={() => setToggle(!toggle)}
        className="pl-2 font-inter text-[#5E6366]"
      >
        Tingkat Prestasi / Penghargaan
      </h5>
      <div
        onClick={() => setToggle(!toggle)}
        className="text-[#5E6366] bg-[#EFF1F9] flex justify-between px-3 rounded-lg py-2"
      >
        {achievementLevel ? achievementLevel : "Pilih Tingkat Prestasi"}
        <Image
          src={"/arrowButtonDown.png"}
          width={25}
          height={25}
          alt="Arrow Down"
        />
      </div>
      <div
        className={`${
          toggle ? "block" : "hidden"
        } bg-white font-inter absolute border border-gray-300 rounded-md shadow-md`}
      >
        {["Lokal", "Nasional", "Internasional"].map((level, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-[#EFF1F9] px-2"
            onClick={() => setToggle(!toggle)}
          >
            <button
              className="text-[#5E6366]"
              onClick={() => updateAchievementLevel(level)}
            >
              {level}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementLevel;
