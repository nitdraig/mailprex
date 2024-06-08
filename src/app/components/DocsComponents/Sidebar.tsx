"use client";

import { useState, useEffect, useRef } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    <aside className="fixed lg:relative lg:w-64 lg:h-screen h-full shadow-md bg-white px-1 lg:transform lg:translate-x-0 transform z-10">
      <button
        className="lg:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
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
        className={`absolute inset-y-0 left-0 lg:static lg:translate-x-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:transition-none transition-transform duration-300 ease-in-out bg-white lg:bg-transparent`}
      >
        <ul>
          <li className="relative">
            <a
              href="/docs/introduction"
              className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Introducción
            </a>
          </li>
          <li className="relative">
            <a
              href="/docs/installation"
              className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Instalación
            </a>
          </li>
          <li className="relative">
            <a
              href="/docs/quick-start"
              className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Guía rápida
            </a>
          </li>
          <li className="relative">
            <a
              href="/docs/examples"
              className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Ejemplos
            </a>
          </li>
          <li className="relative">
            <a
              href="/docs/api"
              className="sidebar-link block py-4 px-6 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              API
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
