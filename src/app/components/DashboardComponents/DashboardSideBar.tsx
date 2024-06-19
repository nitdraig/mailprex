import Link from "next/link";
import React from "react";
import { CgProfile, CgTemplate } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const DashboardSideBar = ({ toggleDarkMode, darkMode }: any) => {
  return (
    <aside className="lg:w-24 w-20 mt-10 flex flex-col items-center  py-4">
      <ul className="mt-2 text-gray-700 dark:text-gray-400 capitalize">
        <li className="mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg">
          <Link href="/dashboard" className=" flex flex-col items-center">
            <MdOutlineSpaceDashboard />
            <span className="text-xs mt-2">DashBoard</span>
          </Link>
        </li>

        <li
          className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
        >
          <a
            target="_blank"
            href="https://docs.mailprex.top"
            className=" flex flex-col items-center"
          >
            <CgTemplate />
            <span className="text-xs mt-2">Docs</span>
          </a>
        </li>
      </ul>
      <button className="p-2 m-4   focus:outline-none" onClick={toggleDarkMode}>
        {darkMode ? (
          <IoSunnyOutline className=" text-accent" />
        ) : (
          <FaMoon className=" text-secondary" />
        )}
      </button>
    </aside>
  );
};

export default DashboardSideBar;
