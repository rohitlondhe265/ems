"use client";
import { submitExamAction } from "@/store/actions";
import useQuizStore from "@/store/quizStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Timer() {
  const router = useRouter();
  const timer = useQuizStore((state) => state.timer);
  const [time, setTime] = useState(timer);

  useEffect(() => {
    let timerInterval; // Define the timerInterval variable here

    const startTimer = () => {
      timerInterval = setInterval(() => {
        setTime((prev) => prev - 1); // Decrease time by 1 second
      }, 1000);

      setTimeout(() => {
        clearInterval(timerInterval);
        submitExamAction(router);
      }, timer * 1000);
    };

    startTimer();

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(timerInterval);
  }, []); // Empty dependency array to run the effect only once
  const formatSeconds = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${hours} : ${minutes} : ${remainingSeconds}`;
  };
  const formattedTime = formatSeconds(time);

  return (
    <p>
      Time Left
      <span className="pl-3 font-semibold text-primary">{formattedTime}</span>
    </p>
  );
}
