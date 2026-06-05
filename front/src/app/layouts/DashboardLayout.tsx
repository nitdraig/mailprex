"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "../hook/useDarkMode";
import { useAuth } from "../api/AuthContext";
import DashboardSideBar from "../components/DashboardComponents/DashboardSideBar";
import ProfileMenu from "../components/ProfileMenu";
import AuthHeader from "../components/AuthHeader";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const { logout, userData } = useAuth();
  const router = useRouter();

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="postal-dashboard-shell flex min-h-dvh">
        <DashboardSideBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-primary/10 bg-white/75 px-5 py-4 backdrop-blur-md dark:border-accent/15 dark:bg-primary/85 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="postal-eyebrow-dark hidden sm:block">Delivery hub</p>
                <div className="flex items-center gap-4">
                  <div className="sm:hidden">
                    <AuthHeader />
                  </div>
                  <h1 className="truncate text-xl font-bold uppercase tracking-[0.06em] text-primary dark:text-white sm:text-2xl">
                    Dashboard
                  </h1>
                </div>
              </div>
              <ProfileMenu photo={userData?.photo} onLogout={handleLogout} />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
