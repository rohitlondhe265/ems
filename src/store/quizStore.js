import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const quizStore = (set) => ({
  userEmail: "",
  categoryId: "",
  set: "",
  questions: [],
  statusArr: [],
  currentQuestionIndex: 0,
  timer: 0,

  startExamination: async (categoryId, selectedSet, email, timer) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/question/${categoryId}/${selectedSet}`
      );
      const fetchedQuestions = await response.data;
      const statusArr = new Array(fetchedQuestions.length).fill(false);
      // const statusArr = new Array(sampleQuestions.length).fill(false);
      set({
        userEmail: email,
        categoryId,
        set: selectedSet,
        questions: fetchedQuestions,
        statusArr,
        currentQuestionIndex: 0,
        timer,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },

  selectOption: (questionIndex, selectedOption) => {
    set((state) => {
      const updatedQuestions = [...state.questions];
      updatedQuestions[questionIndex].selectedOption = selectedOption;
      const updatedStatusArr = [...state.statusArr];
      updatedStatusArr[questionIndex] = true;
      return { questions: updatedQuestions, statusArr: updatedStatusArr };
    });
  },

  clearSelectedOption: (questionIndex) => {
    set((state) => {
      const updatedStatusArr = [...state.statusArr];
      updatedStatusArr[questionIndex] = false;

      const updatedQuestions = [...state.questions];
      updatedQuestions[questionIndex].selectedOption = null;

      return {
        questions: updatedQuestions,
        statusArr: updatedStatusArr,
      };
    });
  },

  nextQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }));
  },

  previousQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex - 1 }));
  },

  resetQuiz: () => {
    set({
      userEmail: "",
      categoryId: "",
      set: "",
      questions: [],
      statusArr: [],
      currentQuestionIndex: 0,
      timer: 0,
    });
  },

  deleteEverything: () => set({}, true),
});

const useQuizStore = create(
  devtools(quizStore, {
    name: "ExamStore",
  })
);
export default useQuizStore;
