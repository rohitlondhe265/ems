"use client";

import ThemeButton from "./ThemeButton";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const goTo = (path) => {
    router.push(path);
  };
  return (
    <div className="bg-skin-on-fill z-[10] h-fit border-b border-base py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <h3
          className="flex items-center gap-2"
          onClick={() => {
            goTo("/");
          }}
        >
          <p className="rounded-lg cursor-pointer border-2 border-b-4 border-r-4 border-base px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block">
            TestMe
          </p>
        </h3>
        <div className="flex items-center gap-3">
          <ThemeButton />
          {session?.status === "authenticated" ? (
            <h6
              onClick={() => {
                goTo("/user");
              }}
              className="flex items-center"
            >
              <UserCircleIcon className="w-9 h-9 cursor-pointer text-base rounded-full" />
            </h6>
          ) : (
            <h6
              onClick={() => {
                goTo("/login");
              }}
              className="inline-flex cursor-pointer items-center bg-skin-fill border-0 py-1 px-3 focus:outline-none hover:opacity-75 rounded text-base"
            >
              Login
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}
