import useQuizStore from "./quizStore";
import useResultStore from "./resultStore";

export function startExamAction(
  selectedCategory,
  selectedSet,
  userEmail,
  time
) {
  useQuizStore
    .getState()
    .startExamination(selectedCategory, selectedSet, userEmail, time);
}
export function nextAction() {
  useQuizStore.getState().nextQuestion();
}
export function previousAction() {
  useQuizStore.getState().previousQuestion();
}
export function moveToQuestionAction(index) {
  useQuizStore.getState().moveToQuestion(index);
}
export function selectOptionAction(currentQuestionIndex, value) {
  useQuizStore.getState().selectOption(currentQuestionIndex, value);
}
export function clearSelectedOptionAction(currentQuestionIndex) {
  useQuizStore.getState().clearSelectedOption(currentQuestionIndex);
}

const calculateResult = (questions, statusArr) => {
  const answers = questions.map((question) => ({
    question: question.question,
    selectedOption: question.selectedOption,
    correctAnswer: question.answer,
    isCorrect: question.answer === question.selectedOption,
  }));

  const score = answers.filter((answer) => answer.isCorrect).length;
  const percentage = (score / questions.length) * 100;
  const attemptedQuestions = statusArr.filter((status) => status).length;

  const result = {
    score,
    percentage,
    totalQuestions: questions.length,
    attemptedQuestions,
    answers,
  };
  return result;
};

export const submitExamAction = (router) => {
  const questions = useQuizStore.getState().questions;
  const statusArr = useQuizStore.getState().statusArr;
  const result = calculateResult(questions, statusArr);
  const newScore = result.score;
  const newPercentage = result.percentage;
  const newTotalQuestions = result.totalQuestions;
  const newAttemptedQuestions = result.attemptedQuestions;
  const newAnswers = result.answers;
  const newIsQuizOver = true;
  useResultStore
    .getState()
    .setResult(
      newScore,
      newPercentage,
      newTotalQuestions,
      newAttemptedQuestions,
      newAnswers,
      newIsQuizOver
    );
  router.push("/examination/live/result");
};

export function resetAllAction(router) {
  useQuizStore.getState().deleteEverything();
  useResultStore.getState().deleteEverything();
  router.push("/examination");
}
