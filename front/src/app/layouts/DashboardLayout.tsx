"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "../hook/useDarkMode";
import { useAuth } from "../api/AuthContext";
import DashboardSideBar from "../components/DashboardComponents/DashboardSideBar";
import ProfileMenu from "../components/ProfileMenu";

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
      <div className="postal-dashboard-shell flex">
        <DashboardSideBar
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          onLogout={handleLogout}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="shrink-0 border-b border-primary/10 bg-white/75 px-4 py-2.5 backdrop-blur-md dark:border-accent/15 dark:bg-primary/85 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="postal-eyebrow-dark hidden lg:block">
                  Delivery hub
                </p>
                <h1 className="truncate text-lg font-bold uppercase tracking-[0.06em] text-primary dark:text-white lg:text-xl">
                  Dashboard
                  {userData?.name ? (
                    <span className="hidden font-semibold normal-case tracking-normal text-secondary/70 dark:text-accent/80 lg:inline">
                      {" "}
                      · {userData.name}
                    </span>
                  ) : null}
                </h1>
              </div>
              <ProfileMenu
                photo={userData?.photo}
                onLogout={handleLogout}
                hideDashboardLink
              />
            </div>
          </header>

          <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 lg:overflow-hidden lg:px-6 lg:py-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
