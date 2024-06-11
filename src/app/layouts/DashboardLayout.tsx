"use client";
import { ReactNode } from "react";
import { useDarkMode } from "../hook/useDarkMode";
import DashboardSideBar from "../components/DashboardComponents/DashboardSideBar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`flex min-h-screen bg-accent dark:bg-secondary z-0`}>
        <DashboardSideBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="flex-1 pt-28 p-8 bg-accent dark:bg-secondary text-secondary dark:text-accent">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
