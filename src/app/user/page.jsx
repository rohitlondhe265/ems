"use client";

import { signOut, useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const session = useSession();
  // if (session.status === "unauthenticated") {
  //   return notFound();
  // }
  // if (session.status !== "authenticated") {
  //   router?.push("/login");
  // }
  const user = session.data?.user;
  return (
    <main>
      <div className="bg-skin-on-fill p-9 shadow-lg rounded-lg w-fit mx-auto">
        <img
          src={user?.image}
          alt={user?.name}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold text-center mt-4">{user?.name}</h2>
        <p className="text-center text-muted">{user?.email}</p>
      </div>
      <button
        className="flex cursor-pointer justify-center items-center mt-3 mx-auto bg-error text-white border-0 py-1 px-3 focus:outline-none hover:opacity-75 rounded"
        onClick={signOut}
      >
        Logout
      </button>
    </main>
  );
}
