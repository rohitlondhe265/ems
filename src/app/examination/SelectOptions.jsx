"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { startExamAction } from "@/store/actions";
import { apiBaseUrl } from "@/constants";
import { useRouter } from "next/navigation";

function SelectOptions() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
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

  const email = useSession().data?.user?.email;

  const handleStartExam = () => {
    const time = categories.find(
      (category) => category._id === selectedCategory
    ).time;
    startExamAction(selectedCategory, selectedSet, email, time);
    router.push("/examination/live");
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);

    setSelectedSet("");
  };

  const handleSetChange = (event) => {
    const selectedSet = event.target.value;
    setSelectedSet(selectedSet);
  };

  return (
    <>
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

      {selectedCategory && (
        <div>
          <select
            className="w-full bg-skin-on-fill py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-skin-on-fill focus:border-none placeholder:text-skin-muted"
            value={selectedSet}
            onChange={handleSetChange}
          >
            <option hidden>Select the Set</option>
            {categories
              .find((category) => category._id === selectedCategory)
              .sets.map((set) => (
                <option key={set} value={set}>
                  Set {set}
                </option>
              ))}
          </select>
          <div>
            {selectedSet && (
              <div>
                <p>
                  This is content for {selectedCategory} - Set {selectedSet}.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mx-auto">
        <button
          disabled={!selectedSet && !email}
          className="bg-primary text-white py-2 px-6 rounded md:ml-8 hover:bg-opacity-75 duration-500"
          onClick={handleStartExam}
        >
          Start Exam
        </button>
      </div>
    </>
  );
}

export default SelectOptions;
