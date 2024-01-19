"use client";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: "Questions", link: "questions" },
    { title: "Categories", link: "categories" },
    { title: "Users", link: "users" },
  ];
  return (
    <>
      <div className="w-64 min-h-screen absolute sm:relative bg-skin-on-fill my-6 rounded-lg shadow md:h-full flex-col justify-between hidden sm:flex">
        <div className="px-8">
          <div className="text-xl font-semibold mt-12 text-primary">Admin Panel</div>
          <ul className="mt-12">
            {menus.map((m, i) => (
              <li
                key={i}
                className="flex w-full justify-between text-base hover:text-muted cursor-pointer items-center mb-6"
              >
                <Link className="flex items-center" href={`/admin/${m.link}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-code"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="7 8 3 12 7 16" />
                    <polyline points="17 8 21 12 17 16" />
                    <line x1={14} y1={4} x2={10} y2={20} />
                  </svg>
                  <span className="text-sm  ml-2">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`w-64 h-96 z-40 absolute bg-skin-on-fill shadow md:h-full flex-col justify-between sm:hidden duration-150 ease-in-out ${
          open ? "-translate-x-[17rem] transition" : "translate-x-0"
        }`}
        id="mobile-nav"
      >
        {/* Toggle button */}
        <div
          className="h-10 w-10 bg-skin-on-fill absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer"
          id="mobile-toggler"
          onClick={() => setOpen(open ? false : true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-adjustments"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#FFFFFF"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx={6} cy={10} r={2} />
            <line x1={6} y1={4} x2={6} y2={8} />
            <line x1={6} y1={12} x2={6} y2={20} />
            <circle cx={12} cy={16} r={2} />
            <line x1={12} y1={4} x2={12} y2={14} />
            <line x1={12} y1={18} x2={12} y2={20} />
            <circle cx={18} cy={7} r={2} />
            <line x1={18} y1={4} x2={18} y2={5} />
            <line x1={18} y1={9} x2={18} y2={20} />
          </svg>
        </div>
        {/* mobile nav content */}
        <div className="px-8">
        <div className="text-xl font-semibold mt-12 text-primary">Admin Panel</div>
          <ul className="mt-12">
            {menus.map((m, i) => (
              <li
                key={i}
                className="flex w-full justify-between text-base hover:text-muted cursor-pointer items-center mb-6"
              >
                <Link className="flex items-center" href={`/admin/${m.link}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-code"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="7 8 3 12 7 16" />
                    <polyline points="17 8 21 12 17 16" />
                    <line x1={14} y1={4} x2={10} y2={20} />
                  </svg>
                  <span className="text-sm  ml-2">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
