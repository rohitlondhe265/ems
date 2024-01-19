"use client";
import { moveToQuestionAction } from "@/store/actions";
import useQuizStore from "@/store/quizStore";

export default function Board() {
  const statusArr = useQuizStore((state) => state.statusArr);
  const handleMoveToQuestion = (i) => {
    moveToQuestionAction(i);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {statusArr?.map((s, i) => (
          <button
            key={i}
            onClick={() => handleMoveToQuestion(i)}
            className={`w-4 h-4 cursor-pointer text-white flex items-center justify-center rounded-sm p-3 transition-colors ${
              s ? "bg-green-600" : "bg-red-600"
            } text-xl`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
