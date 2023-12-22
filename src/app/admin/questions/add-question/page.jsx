"use client";

import { useSearchParams } from "next/navigation";
import AddUpdateQuestion from "../AddUpdateQuestion";

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const set = searchParams.get("set") ?? "";
  const section = searchParams.get("section") ?? "";
  const initialQuestion = { category, set, section };
  return (
    <div className="md:p-9">
      <AddUpdateQuestion initialQuestion={initialQuestion} />
    </div>
  );
}
