"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "1";
  return <div>Admin</div>;
}
