"use client";

import React, { JSX } from "react";

import Image from "next/image";

// component
import Error from "./Error";

// supabase
import { createClient } from "@/utils/supabase/client";
import { getAchievement } from "@/lib/users";

// context
import { useProgressBar, useAchievement } from "@/context/store";

function ListContent(): JSX.Element {
  type Achievement = {
    id: string;
    name: string;
    year: number;
    organizer: string;
    level: string;
    user_id: number;
  }[];

  // context data
  const { updateProgress } = useProgressBar();

  const {
    updateAchievementName,
    updateAchievementLevel,
    updateAcquiredYear,
    updateOrganizer,
  } = useAchievement();

  const [achievement, setAchievement] = React.useState<Achievement>([]);

  const [error, setError] = React.useState<string>("");
  React.useEffect(() => {
    async function getData() {
      const supabase = createClient();
      const user = supabase.auth.getUser();
      const user_id = (await user).data.user?.id as string;

      const data = await getAchievement(user_id);

      if (!data || !Array.isArray(data)) {
        setError(data as string);
        setAchievement([]);
        return;
      }

      setAchievement(data as Achievement);
    }

    getData();
  }, []);

  function handleEdit(
    name: string,
    organizer: string,
    year: number,
    level: string
  ) {
    updateAchievementName(name);
    updateAchievementLevel(level);
    updateAcquiredYear(year);
    updateOrganizer(organizer);

    // updating the progress bar value
    updateProgress(0.6);
  }
  return (
    <div className="md:w-full w-[700px] overflow-x-auto">
      {Array.isArray(achievement) ? (
        achievement.map((item, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 px-2 text-center w-full"
          >
            <div className="px-2">{index + 1}</div>
            <div className="w-full max-w-70 line-clamp-1">{item.name}</div>
            <div className="w-full max-w-70">{item.organizer}</div>
            <div className="w-full max-w-40">{item.level}</div>
            <div className="w-full max-w-30">{item.year}</div>
            <div className="flex justify-between w-full max-w-20 px-4 py-1">
              <Image
                src={"/edit-icon.png"}
                width={20}
                height={20}
                alt="edit icon"
                className="w-4 h-5"
                onClick={() => {
                  handleEdit(item.name, item.organizer, item.year, item.level);
                }}
              />
              <Image
                src={"/delete-icon.png"}
                width={15}
                height={15}
                alt="delete icon"
                className="w-4 h-5"
              />
            </div>
          </div>
        ))
      ) : (
        <Error message={error as string} />
      )}
    </div>
  );
}

export default ListContent;
