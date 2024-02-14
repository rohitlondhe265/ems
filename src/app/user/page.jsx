"use client";

import { apiBaseUrl } from "@/constants";
import useUserStore from "@/store/user";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const isSaved = useUserStore((state) => state.isSaved);
  const setUser = useUserStore((state) => state.setUser);
  // Effect to check session status and handle accordingly
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);
  // Effect to send user data to server on authentication
  useEffect(() => {
    if (session.status === "authenticated" && user) {
      if (!isSaved) {
        const userData = { email: user.email, userName: user.name };
        axios
          .post(`${apiBaseUrl}/user`, userData, {
            headers: {
              "X-API-Key": "your-api-key-1",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error sending user data:", error);
          });
      }
      setUser(user.name, user.email, user.image, true);
    }
  }, [session.status, user]);

  if (session.status === "authenticated" && user) {
    return (
      <main className="my-9">
        <div className="bg-skin-on-fill p-9 shadow-lg rounded-lg w-fit mx-auto">
          <img
            src={user?.image}
            alt={user?.name}
            className="w-32 h-32 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold text-center mt-4">
            {user?.name}
          </h2>
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
  return <>Loading ....</>;
}
