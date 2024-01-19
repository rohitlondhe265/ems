"use client";

import ResultTable from "@/components/ResultTable";
import BtnPrimary from "@/components/BtnPrimary";
import useQuizStore from "@/store/quizStore";
import useResultStore from "@/store/resultStore";
import { resetAllAction } from "@/store/actions";
import { useRouter } from "next/navigation";

export default function Result() {
  const userEmail = useQuizStore((state) => state.userEmail);
  const { score, percentage, totalQuestions, attemptedQuestions } =
    useResultStore();
  const router = useRouter();

  return (
    <div className="relative mx-auto max-w-3xl min-h-screen">
      {/* <h1 className="text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">A Guide to Adding Gradients</h1> */}
      <h1 className="text-4xl md:text-5xl text-center p-4 font-bold">
        Examination Result
      </h1>

      <div className="result flex flex-col justify-center border border-red-300 p-6">
        <div className="flex justify-between">
          <span>Username</span>
          <span className="bold">{userEmail}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Examination Points : </span>
          <span className="bold">{totalQuestions}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Questions Attempted : </span>
          <span className="bold">{attemptedQuestions}</span>
        </div>
        <div className="flex justify-between">
          <span>Marks Obtained : </span>
          <span className="bold">{score}</span>
        </div>
        <div className="flex justify-between">
          <span>Percentage : </span>
          <span className="bold">{percentage}</span>
        </div>
      </div>

      <div className="my-9">
        <button
          className="bg-primary text-white py-2 px-6 rounded md:ml-8 hover:bg-opacity-75 duration-500"
          onClick={() => resetAllAction(router)}
        >
          Reset All
        </button>
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
