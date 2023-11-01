"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UpdateQuestion from "../AddUpdateQuestion";
import { apiBaseUrl } from "@/constants";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  // State to store the fetched question
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    // Define an async function to fetch the question by its ID
    async function fetchQuestion() {
      try {
        const response = await fetch(`${apiBaseUrl}/question/${id}`); // Replace with your API endpoint
        if (response.ok) {
          const question = await response.json();
          setQuestionData(question);
        } else {
          // Handle error if the request is not successful
          console.error("Failed to fetch question data");
        }
      } catch (error) {
        console.error("An error occurred while fetching question data:", error);
      }
    }

    // Call the fetchQuestion function when the component mounts
    fetchQuestion();
  }, [id]);
  const initialQuestion = {
    question: questionData?.question,
    options: questionData?.options,
    answer: questionData?.answer,
    explanation: questionData?.explanation,
    optionImages: questionData?.optionImages,
  };

  return (
    <div className="md:p-9">
      {questionData ? (
        <UpdateQuestion
          initialQuestion={initialQuestion}
          id={questionData?._id}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// "use client";

// import { useSearchParams } from "next/navigation";
// import UpdateQuestion from "../AddUpdateQuestion";

// export default function Page() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id") ?? "";
//   const category = searchParams.get("category") ?? "";
//   const set = searchParams.get("set") ?? "";
//   const section = searchParams.get("section") ?? "";
//   const initialQuestion = {
//     category,
//     set,
//     section,
//     question: "Example Question",
//     options: ["Option A", "Option B", "Option C"],
//     answer: "Option A",
//     explanation: "Example Explanation",
//     optionImages: ["ImageURL1", "ImageURL2"],
//   };
//   return (
//     <div className="md:p-9">
//       <UpdateQuestion initialQuestion={initialQuestion} />
//     </div>
//   );
// }
