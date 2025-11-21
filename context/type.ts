type ProgressBar = {
  progress: number;
  updateProgress: (param: number) => void;
};

interface Report {
  // Grade
  semester: number | null;
  updateSemester: (params: number | null) => void;
  semesterGradeIndex: number | null;
  updateSemesterGradeIndex: (params: number | null) => void;
  gradeFile: File | null;
  updateGradeFile: (params: File | null) => void;
  // Payment
  paymentDate: string;
  updatePaymentDate: (params: string) => void;
  cumulativeGradeIndex: number | null;
  updateCumulativeGradeIndex: (params: number | null) => void;
  paymentFile: File | null;
  updatePaymentFile: (params: File | null) => void;
}

interface Evaluation {
  // current semester
  academicProgress: string | null;
  updateAcademicProgress: (params: string) => void;
  nonAcademicEvaluation: string | null;
  updateNonAcademicEvaluation: (params: string) => void;
  challenges: string | null;
  updateChallenges: (params: string) => void;
  solvingChallenge: string | null;
  updateSolvingChallenge: (params: string) => void;

  // next semester
  academicTarget: string | null;
  updateAcademicTarget: (params: string) => void;
  nonAcademicTarget: string | null;
  updateNonAcademicTarget: (params: string) => void;
  strategy: string | null;
  updateStrategy: (params: string) => void;
}

interface Student {
  name: string;
  updateName: (params: string) => void;
  studentID: string;
  updateStudentID: (params: string) => void;
  profilePicture: string;
  updateProfilePicture: (params: string) => void;
}

interface Achievement {
  achievementName: string | null;
  updateAchievementName: (newName: string | null) => void;
  acquiredYear: number | null;
  updateAcquiredYear: (newYear: number | null) => void;
  organizer: string | null;
  updateOrganizer: (newOrganizer: string | null) => void;
  achievementFile: File | null;
  updateAchievementFile: (newFile: File | null) => void;
  achievementLevel: string | null;
  updateAchievementLevel: (newLevel: string | null) => void;
}

export {
  type ProgressBar,
  type Report,
  type Evaluation,
  type Student,
  type Achievement,
};
