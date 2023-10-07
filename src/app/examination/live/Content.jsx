"use client";
import {
  clearSelectedOptionAction,
  nextAction,
  previousAction,
  selectOptionAction,
  submitExamAction,
} from "@/store/actions";
import Timer from "./Timer";
import useQuizStore from "@/store/quizStore";
import useResultStore from "@/store/resultStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Content() {
  const { questions, currentQuestionIndex, statusArr } = useQuizStore();
  const router = useRouter();
  const isQuizOver = useResultStore((state) => state.isQuizOver);

  const handleSubmit = () => {
    submitExamAction(router);
  };
  useEffect(() => {
    if (isQuizOver) {
      handleSubmit();
    }
  }, [isQuizOver]);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    selectOptionAction(currentQuestionIndex, e.target.value);
  };

  const isAnswered = statusArr[currentQuestionIndex];
  const handleClearOption = () => {
    clearSelectedOptionAction(currentQuestionIndex);
  };

  const [options, setOptions] = useState();
  useEffect(() => {
    setOptions(
      currentQuestion &&
        handleShuffle([currentQuestion?.answer, ...currentQuestion?.options])
    );
  }, [currentQuestionIndex, currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  return (
    <div className="w-full h-full rounded border-dashed border-2 border-gray-300 p-2 md:p-6">
      <div>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>
        {options?.map((option) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={currentQuestion.selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </div>
        ))}

        <Timer />
        <button onClick={previousAction} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button
          onClick={nextAction}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        {isAnswered && (
          <button
            className="bg-red-500 text-white px-2 py-1 mt-2 rounded-md hover:bg-red-600 transition duration-300"
            onClick={handleClearOption}
          >
            Clear Option
          </button>
        )}
      </div>
    </div>
  );
}
