"use client";

import useQuizStore from "@/store/quizStore";

const Timer = () => {
  // const seconds = 60;
  const seconds = useQuizStore((state) => state.timer);
  const formatSeconds = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${hours} : ${minutes} : ${remainingSeconds}`;
  };
  const formattedTime = formatSeconds(seconds);
  return (
    <div className="md:text-2xl text-lg text-base px-3 md:px-6">
      {formattedTime}
    </div>
  );
};

export default Timer;
