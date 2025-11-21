"use client";

import React, { JSX } from "react";

// context
import { useAchievement, useProgressBar } from "@/context/store";
function Organizer(): JSX.Element {
  const { progress, updateProgress } = useProgressBar();

  const { organizer, updateOrganizer } = useAchievement();

  const toggle = React.useRef<boolean>(true);

  React.useEffect(() => {
    function handleProgressBar(): void {
      if (organizer && toggle.current) {
        updateProgress(progress + Math.min(0.2, 1));
        toggle.current = false;
      } else if (organizer === "" || (!organizer && !toggle)) {
        updateProgress(progress - Math.min(0.2, 1));
        toggle.current = true;
      }
    }

    handleProgressBar();
  }, [organizer, progress, updateProgress]);

  function handleOrganizer(value: string): void {
    updateOrganizer(value);
  }
  return (
    <div>
      <h5 className="font-inter text-[#5E6366]">Pengelenggara :</h5>
      <input
        type="text"
        value={organizer ? organizer : ""}
        placeholder="Pemberi Penghargaan"
        className="bg-[#EFF1F9] py-2 pl-2 rounded-lg w-full line-clamp-1"
        onChange={(event) => handleOrganizer(event.target.value as string)}
      />
    </div>
  );
}

export default Organizer;
