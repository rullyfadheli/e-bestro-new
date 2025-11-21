import { create } from "zustand";
import {
  type ProgressBar,
  type Report,
  type Evaluation,
  type Student,
  type Achievement,
} from "@/context/type";

const useProgressBar = create<ProgressBar>((set) => ({
  progress: 0,
  updateProgress: (newProgress: number) => set({ progress: newProgress }),
}));

const useReport = create<Report>((set) => ({
  // Grade
  semester: 0,
  updateSemester: (newSemester) => set({ semester: newSemester }),
  semesterGradeIndex: null,
  updateSemesterGradeIndex: (newGrade) => set({ semesterGradeIndex: newGrade }),
  gradeFile: null,
  updateGradeFile: (newFile) => set({ gradeFile: newFile }),
  // Payment
  paymentDate: "",
  updatePaymentDate: (params) => set({ paymentDate: params }),
  cumulativeGradeIndex: null,
  updateCumulativeGradeIndex: (newGrade) =>
    set({ cumulativeGradeIndex: newGrade }),
  paymentFile: null,
  updatePaymentFile: (params) => set({ paymentFile: params }),
}));

const useEvaluation = create<Evaluation>((set) => ({
  // current semester
  academicProgress: "",
  updateAcademicProgress: (newProgress) =>
    set({ academicProgress: newProgress }),
  challenges: "",
  updateChallenges: (newChallenges) => set({ challenges: newChallenges }),
  solvingChallenge: "",
  updateSolvingChallenge: (newSolvingChallenge) =>
    set({ solvingChallenge: newSolvingChallenge }),
  nonAcademicEvaluation: "",
  updateNonAcademicEvaluation: (newEvaluation) =>
    set({ nonAcademicEvaluation: newEvaluation }),

  // next semester
  academicTarget: "",
  updateAcademicTarget: (newTarget) => set({ academicTarget: newTarget }),
  nonAcademicTarget: "",
  updateNonAcademicTarget: (newTarget) => set({ nonAcademicTarget: newTarget }),
  strategy: "",
  updateStrategy: (newStrategy) => set({ strategy: newStrategy }),
}));

const useStudent = create<Student>((set) => ({
  name: "Loading...",
  updateName: (newName) => set({ name: newName }),
  studentID: "Loading...",
  updateStudentID: (newID) => set({ studentID: newID }),
  profilePicture: "/Avatar.png",
  updateProfilePicture: (newPicture) => set({ profilePicture: newPicture }),
}));

const useAchievement = create<Achievement>((set) => ({
  achievementName: null,
  updateAchievementName: (newName: string | null) =>
    set({ achievementName: newName }),
  acquiredYear: null,
  updateAcquiredYear: (newYear: number | null) =>
    set({ acquiredYear: newYear }),
  organizer: null,
  updateOrganizer: (newOrganizer: string | null) =>
    set({ organizer: newOrganizer }),
  achievementFile: null,
  updateAchievementFile: (newFile: File | null) =>
    set({ achievementFile: newFile }),
  achievementLevel: null,
  updateAchievementLevel: (newLevel: string | null) =>
    set({ achievementLevel: newLevel }),
}));

export { useProgressBar, useReport, useEvaluation, useStudent, useAchievement };
