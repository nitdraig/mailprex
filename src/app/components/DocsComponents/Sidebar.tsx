"use client";

import Link from "next/link";
import { useState, useEffect, useRef, FC } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

interface SidebarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Sidebar: FC<SidebarProps> = ({ toggleDarkMode, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <aside
      className={`fixed pt-20  ${
        isOpen ? "w-36" : "w-16"
      }  lg:relative lg:w-60 lg:h-screen h-full    shadow-md px-1 lg:transform lg:translate-x-0 transform z-10 bg-accent/80 dark:bg-secondary dark:shadow-accent flex flex-col justify-between`}
    >
      <div>
        <button
          className="lg:hidden p-4 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div
          ref={sidebarRef}
          className={`absolute inset-y-0 left-0  lg:static lg:translate-x-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:transition-none transition-transform duration-300 ease-in-out `}
        >
          <ul>
            <li className="relative">
              <Link
                prefetch
                href="/docs/introduction"
                className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Introduction
              </Link>
            </li>
            <li className="relative">
              <Link
                prefetch
                href="/docs/integration"
                className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Integration
              </Link>
            </li>
            <li className="relative">
              <Link
                prefetch
                href="/docs/mailprexhook"
                className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Mailprexhook
              </Link>
            </li>
            <li className="relative">
              <Link
                prefetch
                href="/docs/examples"
                className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Examples
              </Link>
            </li>

            <li className="relative">
              <Link
                prefetch
                href="/docs/guide"
                className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Guide
              </Link>
            </li>
            <li className="relative">
              <Link
                prefetch
                href="/docs/api"
                className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                API
              </Link>
            </li>
          </ul>
          <button
            className="p-2 m-4   focus:outline-none"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <IoSunnyOutline className=" text-accent" />
            ) : (
              <FaMoon className=" text-secondary" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
