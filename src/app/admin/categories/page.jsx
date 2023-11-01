"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BtnPrimary from "@/components/BtnPrimary";
import { apiBaseUrl } from "@/constants";

export default function page() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
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
  const handleEditClick = () => {
    router.push(`/admin/categories/add-cat`);
  };
  const deleteCat = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/category/${id}`);
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };
  return (
    <div>
      <BtnPrimary
        href={`/admin/categories/add-cat`}
        className="bg-primary text-white p-2 shadow-md rounded-lg"
      >
        Add Question
      </BtnPrimary>
      <table className="w-full border-collapse border border-gray-300 overflow-x-scroll">
        <thead>
          <tr className="bg-skin-on-fill">
            <th className="p-2">Sr. No.</th>
            <th className="p-2">Title</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((c, i) => (
            <tr key={i} className="border-b border-gray-300">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <BtnPrimary
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    href={`/admin/categories/update-cat?id=${c._id}`}
                  >
                    Edit
                  </BtnPrimary>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteCat(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
