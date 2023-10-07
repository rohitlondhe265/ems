"use client";

import { signOut, useSession } from "next-auth/react";
import UserProfile from "./UserProfile";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
export default function User() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    return notFound;
  }
  if (session.status !== "authenticated") {
    router?.push("/login");
  }
  const user = session.data?.user;
  return (
    <main>
      <UserProfile user={user} />
      <button
        className="flex cursor-pointer justify-center items-center mt-3 mx-auto bg-error text-white border-0 py-1 px-3 focus:outline-none hover:opacity-75 rounded"
        onClick={signOut}
      >
        Logout
      </button>
    </main>
  );
}
