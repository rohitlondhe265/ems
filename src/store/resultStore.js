import { create } from "zustand";
import { devtools } from "zustand/middleware";

const resultStore = (set) => ({
  score: 0,
  percentage: 0,
  totalQuestions: 0,
  attemptedQuestions: 0,
  answers: [],
  isQuizOver: false,

  setResult: (
    newScore,
    newPercentage,
    newTotalQuestions,
    newAttemptedQuestions,
    newAnswers,
    newIsQuizOver
  ) => {
    set({
      score: newScore,
      percentage: newPercentage,
      totalQuestions: newTotalQuestions,
      attemptedQuestions: newAttemptedQuestions,
      answers: newAnswers,
      isQuizOver: newIsQuizOver,
    });
  },

  deleteEverything: () => set({}, true),
});

const useResultStore = create(
  devtools(resultStore, {
    name: "Result",
  })
);
export default useResultStore;
