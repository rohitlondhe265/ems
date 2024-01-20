"use client";

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  // useEffect(async () => {
  //   if (session.status === "authenticated") {
  //     const user = { email: user?.email, userName: user?.name };
  //     const response = await axios.post(`${apiBaseUrl}/user`, user, {
  //       headers: {
  //         "X-API-Key": "your-api-key-1",
  //       },
  //     });
  //     console.log(response);
  //   }
  // }, []);

  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="my-9">
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
