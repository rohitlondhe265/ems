"use client";
import { apiBaseUrl } from "@/constants";
import axios from "axios";

import React, { useState } from "react";
import TextEditor from "./TextEditor";

const AddUpdateCat = ({ initialCat, id }) => {
  const [categoryData, setCategoryData] = useState({
    name: initialCat?.name || "",
    questions: initialCat?.questions || 0,
    pointsPerQuestion: initialCat?.pointsPerQuestion || 0,
    time: initialCat?.time || 0,
    sets: initialCat?.sets || [],
    sections: initialCat?.sections || [],
    tags: initialCat?.tags || [],
    description: initialCat?.description || "",
    banner: initialCat?.banner || "",
    instructions: initialCat?.instructions || "",
    isPaid: initialCat?.isPaid || false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags" || name === "sets" || name === "sections") {
      const arrayValues = value.split(",").map((item) => item.trim());
      setCategoryData({
        ...categoryData,
        [name]: arrayValues,
      });
    } else {
      setCategoryData({
        ...categoryData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.put(`${apiBaseUrl}/category/${id}`, cat, {
          headers: {
            "X-API-Key": "your-api-key-1",
          },
        });
        console.log("Updated question:", response.data);
      } else {
        const response = await axios.post(`${apiBaseUrl}/category`, cat, {
          headers: {
            "X-API-Key": "your-api-key-1",
          },
        });
        console.log("New question created:", response.data);
      }
      setCat({
        name: "",
        questions: 0,
        pointsPerQuestion: 0,
        time: 0,
        sets: [],
        sections: [],
        tags: [],
        description: "",
        banner: "",
        instructions: initialCat.instructions || "",
        isPaid: false,
      });
    } catch (error) {
      console.error("Error creating/updating question:", error);
    }
  };

  return (
    <div className="">
      <button onClick={() => console.log(categoryData)}>Log</button>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            name="name"
            value={categoryData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="number"
            name="time"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.time}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Questions:
          <input
            type="number"
            name="questions"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.questions}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Points per Question:
          <input
            type="number"
            name="pointsPerQuestion"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.pointsPerQuestion}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Banner:
          <input
            type="text"
            name="banner"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.banner}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tags (comma-separated):
          <input
            type="text"
            name="tags"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.tags}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sets (comma-separated):
          <input
            type="text"
            name="sets"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.sets}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sections (comma-separated):
          <input
            type="text"
            name="sections"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.sections}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Is Paid:
          <input
            type="checkbox"
            name="isPaid"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            checked={categoryData.isPaid}
            onChange={handleInputChange}
          />
        </label>
        <TextEditor
          data={categoryData}
          setData={setCategoryData}
          textName={"instructions"}
          textValue={categoryData.instructions}
        />
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

export default AddUpdateCat;
