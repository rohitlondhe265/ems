"use client";
import { apiBaseUrl } from "@/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const AddQuestion = ({ initialQuestion, id }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const set = searchParams.get("set") ?? "";
  const section = searchParams.get("section") ?? "";

  const [question, setQuestion] = useState({
    question: initialQuestion?.question || "",
    options: initialQuestion?.options || ["", "", ""],
    answer: initialQuestion?.answer || "",
    explanation: initialQuestion?.explanation || "",
    optionImages: initialQuestion?.optionImages || [],
  });

  const addOrUpdateOptions = (index, value) => {
    let newArray = [...question.options];
    if (index < newArray.length) {
      newArray[index] = value; // Update
    } else {
      newArray.push(value); // Add
    }

    setQuestion((prevData) => ({
      ...prevData,
      options: newArray,
    }));
  };

  const handleSubmit = async (e) => {
    console.log({ category, set, section });
    e.preventDefault();
    try {
      if (id) {
        const data = { category, set, section, ...question };
        console.log(data);
        const response = await axios.put(`${apiBaseUrl}/question/${id}`, data, {
          headers: {
            "X-API-Key": "your-api-key-1",
          },
        });
        console.log("Updated question:", response.data);
        setQuestion({
          ...question,
          question: "",
          options: ["", "", ""],
          answer: "",
          explanation: "",
          optionImages: [],
        });
      } else {
        const data = { category, set, section, ...question };
        console.log(data);
        const response = await axios.post(`${apiBaseUrl}/question`, data, {
          headers: {
            "X-API-Key": "your-api-key-1",
          },
        });
        console.log("New question created:", response.data);
        setQuestion({
          ...question,
          question: "",
          options: ["", "", ""],
          answer: "",
          explanation: "",
          optionImages: [],
        });
      }
    } catch (error) {
      console.error("Error creating/updating question:", error);
    }
  };

  return (
    <div className="space-y-3">
      <button onClick={() => console.log(question)}>Log</button>
      <form onSubmit={handleSubmit}>
        {/* question */}
        <div className="mb-4">
          <label htmlFor="options" className="block font-medium mb-2">
            Question
          </label>
          <textarea
            name="question"
            cols="18"
            rows="6"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
          ></textarea>
        </div>
        {/* Options */}
        <div className="mb-4 space-y-2">
          <label htmlFor="options" className="block font-medium mb-2">
            Options
          </label>
          {question.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Incorrect Option No. ${index + 1}`}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={option}
              onChange={(e) => addOrUpdateOptions(index, e.target.value)}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={question.answer}
            onChange={(e) =>
              setQuestion({
                ...question,
                answer: e.target.value,
              })
            }
          />
        </div>
        {/* Image urls */}
        <div className="mb-4">
          <label htmlFor="keywords" className="block font-medium mb-2">
            Image Options
          </label>
          <input
            type="text"
            id="keywords"
            placeholder="Enter Comma Separated Options Image Urls Optional"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={question.optionImages.join(", ")}
            onChange={(e) =>
              setQuestion({
                ...question,
                optionImages: e.target.value
                  .split(",")
                  .map((url) => url.trim()),
              })
            }
          />
        </div>
        {/* explanation */}
        <div className="mb-4">
          <label htmlFor="options" className="block font-medium mb-2">
            Explaination
          </label>
          <textarea
            name="explanation"
            cols="30"
            rows="10"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={question.explanation}
            onChange={(e) =>
              setQuestion({ ...question, explanation: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        >
          {id ? "Update Question" : "Add Question"}
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
