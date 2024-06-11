"use client";
import { ReactNode } from "react";
import { useDarkMode } from "../hook/useDarkMode";
import DocSidebar from "../components/DocsComponents/DocsSidebar";

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
        <DocSidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="flex-1  bg-accent dark:bg-secondary text-secondary dark:text-accent">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
