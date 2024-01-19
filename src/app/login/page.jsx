"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/user");
  }

  return (
    <div className="h-screen flex justify-center items-center px-2">
      <div className="flex flex-col justify-center items-center bg-skin-on-fill p-8 rounded-lg shadow-lg text-center mx-auto md:h-1/2 md:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 text-primary">
          Login with Google
        </h1>
        <p className="mb-4 text-muted">
          Please click the button below to log in using your Google account.
        </p>
        <button
          onClick={() => {
            signIn("google");
          }}
          className="flex items-center border border-primary rounded px-4 py-2 hover:bg-skin-fill focus:outline-none focus:ring focus:border-primary w-fit"
        >
          <ChevronDoubleLeftIcon className="w-6 h-6 mr-2" /> Login with Google
        </button>
      </div>
    </div>
  );
}
