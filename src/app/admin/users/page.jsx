"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "@/constants";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [users, setusers] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/user`)
      .then((response) => {
        setusers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${apiBaseUrl}/user/${id}`, {
        headers: {
          "X-API-Key": "your-api-key-1",
        },
      });
      router.refresh();
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };
  return (
    <div>
      <h3 className="text-xl font-medium mb-6">Users Management</h3>
      <table className="w-full border-collapse border border-gray-300 overflow-x-scroll">
        <thead>
          <tr className="bg-skin-on-fill">
            <th className="p-2">Sr. No.</th>
            <th className="p-2">User Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((c, i) => (
            <tr key={i} className="border-b border-gray-300">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{c.userName}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteUser(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
