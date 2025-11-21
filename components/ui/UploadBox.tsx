import React, { useRef, useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useReport, useProgressBar } from "@/context/store";

interface UploadBoxProps {
  label: string;
  onFileSelect?: (file: File) => void;
}

export default function UploadBox({ label, onFileSelect }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const { gradeFile, updateGradeFile } = useReport();
  const { progress, updateProgress } = useProgressBar();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      updateGradeFile(file);
      onFileSelect?.(file);
    }
  };
  // Updating progress bar
  useEffect(() => {
    if (gradeFile) {
      console.log(gradeFile);
      updateProgress(progress + 0.2);
    }
  }, [gradeFile, progress, updateProgress]);

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
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
