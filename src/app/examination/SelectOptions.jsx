"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { startExamAction } from "@/store/actions";
import { apiBaseUrl } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

function SelectOptions() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedSet, setSelectedSet] = useState("");
  const [instructions, setInstructions] = useState("");
  const router = useRouter();

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
  useEffect(() => {
    setInstructions(
      categories.find((category) => category._id === selectedCategory)
        ?.instructions
    );
    setSelectedSet("");
  }, [selectedCategory, categories]);

  const email = useSession().data?.user?.email;

  const handleStartExam = () => {
    const time = categories.find(
      (category) => category._id === selectedCategory
    ).time;
    startExamAction(selectedCategory, selectedSet, email, time);
    router.push("/examination/live");
  };

  return (
    <div className="w-full mt-9 md:px-16 py-9 flex bg-skin-on-fill gap-9 flex-col md:flex-row">
      {instructions && (
        <div className="md:w-1/2 md:mx-6 px-3">
          <h4 className="font-semibold text-primary text-center mb-3 text-2xl">
            Instructions
          </h4>
          <p className="text-justify">{instructions}</p>
        </div>
      )}

      <div className="gap-6 md:mx-6 md:px-3 md:flex-1 flex flex-col justify-center">
        <h4 className="font-semibold text-primary text-center text-2xl">
          Exam Settings
        </h4>
        <select
          className="bg-skin-fill mx-3 py-3 px-4 rounded-md leading-tight focus:outline-1 focus:border-none placeholder:text-skin-muted"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
        {selectedCategory && (
          <select
            className="bg-skin-fill mx-3 py-3 px-4 rounded-md leading-tight focus:outline-1 focus:border-none placeholder:text-skin-muted"
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
          >
            <option hidden>Select the Set</option>
            {categories
              ?.find((category) => category._id === selectedCategory)
              ?.sets.map((set) => (
                <option key={set} value={set}>
                  Set {set}
                </option>
              ))}
          </select>
        )}
        <button
          disabled={!selectedSet && !email}
          className="bg-primary w-fit mx-auto text-white py-2 px-6 rounded hover:bg-opacity-75 duration-500"
          onClick={handleStartExam}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default SelectOptions;
