"use client";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useDarkMode } from "../../hook/useDarkMode";

interface LayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: LayoutProps) => {
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`flex min-h-screen bg-accent dark:bg-secondary z-0`}>
        <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="flex-1 pt-28 p-8 bg-accent dark:bg-secondary text-secondary dark:text-accent">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
