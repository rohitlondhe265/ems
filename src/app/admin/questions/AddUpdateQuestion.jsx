"use client";
import { apiBaseUrl } from "@/constants";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddQuestion = ({ initialQuestion, id }) => {
  const questionRef = useRef();
  const explanationRef = useRef();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const set = searchParams.get("set") ?? "";
  const section = searchParams.get("section") ?? "";

  const [question, setQuestion] = useState({
    question: initialQuestion.question || "",
    options: initialQuestion.options || ["", "", ""],
    answer: initialQuestion.answer || "",
    explanation: initialQuestion.explanation || "",
    optionImages: initialQuestion.optionImages || [],
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

  const handleImage = (ref) => {
    const imageUrl = window.prompt("Enter the URL of the image:");
    if (imageUrl) {
      const quill = ref.current.getEditor();
      quill.focus();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", imageUrl);
    }
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        [{ indent: "-1" }, { indent: "+1" }],
        [
          { header: "1" },
          { header: "2" },
          { header: "3" },
          { header: "4" },
          { header: "5" },
          { header: "6" },
        ],
      ],
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "link",
    "list",
    "bullet",
    "blockquote",
    "indent",
    "header",
    "image",
  ];
  const handleExplanationChange = (value) => {
    // Check if the new value is different from the previous value
    if (value !== question.explanation) {
      setQuestion({ ...question, explanation: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log({category, set, section,})
    e.preventDefault();
    try {
      if (id) {
        const data = { category, set, section, ...question, };
        console.log(data);
        const response = await axios.put(
          `${apiBaseUrl}/question/${id}`,
          data,
          {
            headers: {
              "X-API-Key": "your-api-key-1",
            },
          }
        );
        console.log("Updated question:", response.data);
      } else {
        const data = { category, set, section, ...question };
        console.log(data);
        const response = await axios.post(
          `${apiBaseUrl}/question`,
          data,
          {
            headers: {
              "X-API-Key": "your-api-key-1",
            },
          }
        );
        console.log("New question created:", response.data);
      }
      setQuestion({
        category: "",
        set: "",
        section: "",
        question: "",
        options: ["", "", ""],
        answer: "",
        explanation: "",
        optionImages: [],
      });
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
          <label htmlFor="question" className="block font-medium mb-2">
            Question
            <ClipboardDocumentCheckIcon
              className="h-9 w-9 ml-6 text-base inline-block"
              onClick={() => handleImage(questionRef)}
            />
          </label>
          <ReactQuill
            ref={questionRef}
            value={question.question}
            onChange={(value) => setQuestion({ ...question, question: value })}
            modules={modules}
            formats={formats}
            placeholder="Enter the question text..."
            theme="snow"
          />
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
          <label htmlFor="explanation" className="block font-medium mb-2">
            Explanation
            <ClipboardDocumentCheckIcon
              className="h-9 w-9 ml-6 text-base inline-block"
              onClick={() => handleImage(explanationRef)}
            />
          </label>
          <ReactQuill
            ref={explanationRef}
            value={question.explanation}
            // onChange={(value) =>
            //   setQuestion({ ...question, explanation: value })
            // }
            onChange={handleExplanationChange}
            modules={modules}
            formats={formats}
            placeholder="Write Solution of Question Here..."
            theme="snow"
          />
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
