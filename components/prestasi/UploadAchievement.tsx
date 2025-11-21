"use client";

import React, { JSX } from "react";
import { FiUploadCloud } from "react-icons/fi";

// context
import { useAchievement, useProgressBar } from "@/context/store";

function UploadAchievement(): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { progress, updateProgress } = useProgressBar();
  const { achievementFile, updateAchievementFile } = useAchievement();

  const [fileName, setFileName] = React.useState<string>("");

  const toggle = React.useRef<boolean>(true);

  React.useEffect(() => {
    function handleProgressBar(): void {
      if (achievementFile && toggle.current) {
        updateProgress(progress + Math.min(0.2, 1));
        toggle.current = false;
      } else if (!achievementFile && !toggle.current) {
        updateProgress(progress - Math.min(0.2, 1));
        toggle.current = true;
      }
    }

    handleProgressBar();
  }, [achievementFile, progress, updateProgress]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    console.log(event.target.files);
    if (!file) {
      alert("Please upload PDF file");
    } else {
      setFileName(file.name);
      updateAchievementFile(file);
    }
  }
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Upload Bukti Prestasi/Penghargaan
      </label>
      <div
        className="w-full bg-[#F5F7FF] border-2 border-dashed border-[#E5E7EB] p-6 rounded-xl text-center cursor-pointer hover:border-gray-400 transition"
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex justify-center mb-2 text-gray-500 text-3xl">
          <FiUploadCloud />
        </div>
        {fileName ? (
          <p className="text-sm text-gray-700 font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-sm text-gray-700 font-semibold">
              Choose a file or drag & drop it here.
            </p>
            <p className="text-xs text-gray-500 mb-4">
              JPEG, PNG, and PDF formats, up to 5 MB.
            </p>
            <span className="inline-block px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
              Browse File
            </span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default UploadAchievement;
