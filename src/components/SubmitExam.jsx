"use client";

import { submitExamAction } from "@/store/actions";
import { useRouter } from "next/navigation";

export default function SubmitExam() {
  const router = useRouter();
  const handleSubmit = () => {
    submitExamAction(router);
  };
  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
