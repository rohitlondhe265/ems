"use client";

import { apiBaseUrl } from "@/constants";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddUpdateCat = ({ initialCat }) => {
  const router = useRouter();
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
      if (initialCat?._id) {
        const response = await axios.put(
          `${apiBaseUrl}/category/${initialCat._id}`,
          categoryData,
          {
            headers: {
              "X-API-Key": "your-api-key-1",
            },
          }
        );
        console.log("Updated Category:", response.data);
        setCategoryData({
          name: "",
          questions: 0,
          pointsPerQuestion: 0,
          time: 0,
          sets: [],
          sections: [],
          tags: [],
          description: "",
          banner: "",
          instructions: "",
          isPaid: false,
        });
        router.push("/admin/categories");
      } else {
        const response = await axios.post(
          `${apiBaseUrl}/category`,
          categoryData,
          {
            headers: {
              "X-API-Key": "your-api-key-1",
            },
          }
        );
        console.log("New Category created:", response.data);
        setCategoryData({
          name: "",
          questions: 0,
          pointsPerQuestion: 0,
          time: 0,
          sets: [],
          sections: [],
          tags: [],
          description: "",
          banner: "",
          instructions: "",
          isPaid: false,
        });
        router.push("/admin/categories");
      }
    } catch (error) {
      console.error("Error creating/updating Category:", error);
    }
  };

  return (
    <div className="">
      <button onClick={() => console.log(categoryData)}>Log</button>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
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
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div>
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
          </div>
          <div>
            Questions:
            <input
              type="number"
              name="questions"
              placeholder="Correct Option"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={categoryData.questions}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Points Per Question:
            <input
              type="number"
              name="pointsPerQuestion"
              placeholder="Correct Option"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={categoryData.pointsPerQuestion}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          Description:
          <textarea
            name="description"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Banner:
          <input
            type="text"
            name="banner"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.banner}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Tags (comma-separated):
          <input
            type="text"
            name="tags"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.tags}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Sets (comma-separated):
          <input
            type="text"
            name="sets"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.sets}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Sections (comma-separated):
          <input
            type="text"
            name="sections"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.sections}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Is Paid:
          <input
            type="checkbox"
            name="isPaid"
            placeholder="Correct Option"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            checked={categoryData.isPaid}
            onChange={() => {
              categoryData.isPaid
                ? setCategoryData({ ...categoryData, isPaid: false })
                : setCategoryData({ ...categoryData, isPaid: true });
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Instructions</label>
          <textarea
            name="instructions"
            cols="30"
            rows="10"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={categoryData.instructions}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        >
          {initialCat?._id ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddUpdateCat;
