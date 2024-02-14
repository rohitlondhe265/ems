"use client";

import { useSearchParams } from "next/navigation";
import AddUpdateCat from "../AddUpdateCat";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "@/constants";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const [cat, setCat] = useState(null);

  useEffect(() => {
    async function fetchCat() {
      try {
        const response = await fetch(`${apiBaseUrl}/category/${id}`);
        if (response.ok) {
          const category = await response.json();
          setCat(category);
        } else {
          console.error("Failed to fetch question data");
        }
      } catch (error) {
        console.error("An error occurred while fetching question data:", error);
      }
    }
    fetchCat();
  }, [id]);
  return (
    <div>{cat ? <AddUpdateCat initialCat={cat} /> : <p>Loading...</p>}</div>
  );
}
