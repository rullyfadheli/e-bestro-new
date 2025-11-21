"use client";

import React, { JSX } from "react";

// context
import { useEvaluation, useProgressBar } from "@/context/store";
function TextStrategy(): JSX.Element {
  const { progress, updateProgress } = useProgressBar();
  const { strategy, updateStrategy } = useEvaluation();

  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    if (Boolean(strategy && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.1, 1));
      isHasValue.current = true;
    }

    if (!strategy && isHasValue.current) {
      updateProgress(Math.max(progress - 0.1, 0));
      isHasValue.current = false;
    }
  }, [strategy, progress, updateProgress]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const data = event.target.value;
    updateStrategy(data);
  }
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Strategi Pencapaian Target
      </label>
      <textarea
        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md bg-white text-sm shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
        placeholder="Tulis langkah nyata untuk mencapai target"
        onChange={(e) => handleChange(e)}
        value={strategy || ""}
        maxLength={300}
      />
    </div>
  );
}

export default TextStrategy;
