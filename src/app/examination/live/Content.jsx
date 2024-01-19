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
        <div className="flex justify-between items-center text-lg mb-3">
          <h4>
            Question:
            <span className="pl-3 font-semibold text-primary">
              {currentQuestionIndex + 1}
            </span>
          </h4>
          <Timer />
        </div>
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

        <div className="flex justify-evenly items-center flex-wrap">
          <button
            className="bg-primary cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-300"
            onClick={previousAction}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-primary cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-300"
            onClick={nextAction}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
          {isAnswered && (
            <button
              className="bg-error cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-300"
              onClick={handleClearOption}
            >
              Clear Option
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
