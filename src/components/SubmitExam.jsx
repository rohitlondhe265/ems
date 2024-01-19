"use client";

import { submitExamAction } from "@/store/actions";
import { useRouter } from "next/navigation";

export default function SubmitExam() {
  const router = useRouter();
  const handleSubmit = () => {
    submitExamAction(router);
  };
  return (
    <button
      className="bg-primary text-white py-2 px-6 mt-9 mx-auto rounded hover:bg-opacity-75 duration-500"
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
}
