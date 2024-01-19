"use client";

import { useState } from "react";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import Board from "@/components/Board";
import SubmitExam from "@/components/SubmitExam";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Laptop sidebar */}
      <div className="w-72 bg-skin-on-fill shadow p-6 sm:block hidden">
        <Board />
        <SubmitExam />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`w-60 z-40 absolute top-96 bg-skin-on-fill shadow flex-col justify-between transition duration-150 ease-in-out md:hidden ${
          open
            ? "bg-skin-on-fill translate-x-0"
            : "bg-red-500-600 -translate-x-64"
        }`}
      >
        <div
          className="h-9 w-9 bg-skin-on-fill absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
        </div>
        <div className="p-3">
          <Board />
          <SubmitExam />
        </div>
      </div>
    </div>
  );
}
