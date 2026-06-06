"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/dashboard/admin");

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
          isAdmin={userData?.isAdmin}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="shrink-0 border-b border-slate-200/80 bg-white/90 px-4 py-3 text-slate-900 backdrop-blur-md dark:border-white/[0.1] dark:bg-[#121d30]/95 dark:text-slate-100">
            <div className="flex items-center justify-between gap-3">
              <h1 className="min-w-0 truncate text-base font-semibold text-slate-900 dark:text-white">
                {isAdminRoute ? (
                  <>
                    Admin console
                    <span className="postal-dashboard-muted hidden font-normal sm:inline">
                      {" "}
                      · platform control
                    </span>
                  </>
                ) : (
                  <>
                    Hello, {userData?.name ?? "there"}
                    <span className="postal-dashboard-muted hidden font-normal sm:inline">
                      {" "}
                      · tokens & deliveries
                    </span>
                  </>
                )}
              </h1>
              <ProfileMenu
                photo={userData?.photo}
                onLogout={handleLogout}
                hideDashboardLink
              />
            </div>
          </header>

          <main
            className={`flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 lg:px-6 lg:py-6 ${
              isAdminRoute ? "justify-start" : "justify-center lg:overflow-hidden"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
