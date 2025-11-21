"use client";

import React, { JSX } from "react";

// components
// current semester
import TextAcademicProgress from "@/components/perkembangan-diri/evaluasi-refleksi-diri/TextAcademicProgress";
import TextNonAcademicEvaluation from "./evaluasi-refleksi-diri/TextNonAcademicEvaluation";
import TextChallenge from "@/components/perkembangan-diri/evaluasi-refleksi-diri/TextChallenge";
import TextSolvingChallenge from "@/components/perkembangan-diri/evaluasi-refleksi-diri/TextSolvingChallenge";

// next semester
import TextAcademicTarget from "./target-rencana-kedepan/TextAcademicTarget";
import TextNonAcademicTarget from "./target-rencana-kedepan/TextNonAcademicTarget";
import TextStrategy from "./target-rencana-kedepan/TextStrategy";
function AcademicProgress(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Current semester */}
      <div>
        <span className="bg-yellow-400 inline-block text-black font-semibold px-4 py-2 rounded mb-4">
          Evaluasi & Refleksi Diri
        </span>
        <TextAcademicProgress />
        <TextNonAcademicEvaluation />
        <TextChallenge />
        <TextSolvingChallenge />
      </div>
      <div>
        {/* Next semester */}
        <span className="bg-yellow-400 inline-block text-black font-semibold px-4 py-2 rounded mb-4">
          Target dan Rencana Ke Depan
        </span>
        <TextAcademicTarget />
        <TextNonAcademicTarget />
        <TextStrategy />
      </div>
    </div>
  );
}

export default AcademicProgress;
