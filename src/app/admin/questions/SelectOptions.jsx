"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/constants";

function SelectOptions() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleClick = () => {
    if (selectedSet) {
      axios
        .get(
          `${apiBaseUrl}/question/${selectedCategory}?set=${selectedSet}&section=${selectedSection}`
        )
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          setQuestions([]);
          console.error("Error fetching Questions:", error);
        });
    }
  };
  const handleAddClick = () => {
    if (selectedSection) {
      router.push(
        `/admin/questions/add-question?category=${selectedCategory}&set=${selectedSet}&section=${selectedSection}`
      );
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);

    setSelectedSet("");
    setSelectedSection("");
  };
  const handleEditClick = (id) => {
    router.push(
      `/admin/questions/update-question?id=${id}&category=${selectedCategory}&set=${selectedSet}&section=${selectedSection}`
    );
  };
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/question/${id}`);
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };
  return (
    <>
      <div className="flex gap-6">
        <select
          className="w-full bg-skin-on-fill py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-skin-on-fill focus:border-none placeholder:text-skin-muted"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select the Category
          </option>
          {categories.map((category, i) => (
            <option key={i} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="w-full bg-skin-on-fill py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-skin-on-fill focus:border-none placeholder:text-skin-muted"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option hidden>Select the Set</option>
          {categories
            .find((category) => category._id === selectedCategory)
            ?.sets?.map((set) => (
              <option key={set} value={set}>
                Set {set}
              </option>
            ))}
        </select>

        <select
          className="w-full bg-skin-on-fill py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-skin-on-fill focus:border-none placeholder:text-skin-muted"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option hidden>Select the Section</option>
          {categories
            .find((category) => category._id === selectedCategory)
            ?.sections?.map((set) => (
              <option key={set} value={set}>
                Set {set}
              </option>
            ))}
        </select>
      </div>
      <div>
        <p>
          This is content for {selectedCategory} - Set {selectedSet} - Section -
          {selectedSection}
        </p>
      </div>
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={handleClick}
          className="bg-primary text-white p-2 shadow-md rounded-lg"
        >
          Fetch Questions
        </button>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white p-2 shadow-md rounded-lg"
        >
          Add Question
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300 overflow-x-scroll">
        <thead>
          <tr className="bg-skin-on-fill">
            <th className="p-2">Sr. No.</th>
            <th className="p-2">Question</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions?.map((q, i) => (
            <tr key={i} className="border-b border-gray-300">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{q.question}</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEditClick(q._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteQuestion(q._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SelectOptions;
