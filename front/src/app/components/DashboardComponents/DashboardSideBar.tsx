"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgTemplate } from "react-icons/cg";
import { FaMoon, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

type DashboardSideBarProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
  onLogout: () => void;
  isAdmin?: boolean;
};

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100";

const iconBtnActive =
  "bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent";

const DashboardSideBar = ({
  toggleDarkMode,
  darkMode,
  onLogout,
  isAdmin = false,
}: DashboardSideBarProps) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const isAdminRoute = pathname?.startsWith("/dashboard/admin");

  return (
    <aside className="flex w-14 shrink-0 flex-col items-center border-r border-slate-200/80 bg-white py-3 dark:border-white/[0.06] dark:bg-[#121d30]">
      <Link href="/" className="mb-4 p-0.5" aria-label="Back to home">
        <img
          className="h-8 w-8 rounded-full border border-slate-200 object-cover dark:border-white/10"
          src="https://mailprex.excelso.xyz/logo.webp"
          alt="Mailprex"
        />
      </Link>

      <Link
        href="/dashboard"
        className={`${iconBtn} ${isDashboard ? iconBtnActive : ""}`}
        title="Dashboard"
      >
        <MdDashboard className="text-base" />
      </Link>

      {isAdmin ? (
        <Link
          href="/dashboard/admin"
          className={`${iconBtn} ${isAdminRoute ? iconBtnActive : ""}`}
          title="Admin console"
        >
          <FaShieldAlt className="text-base" />
        </Link>
      ) : null}

      <a
        href="https://docs.mailprex.excelso.xyz"
        target="_blank"
        rel="noreferrer"
        className={iconBtn}
        title="Documentation"
      >
        <CgTemplate className="text-base" />
      </a>

      <div className="mt-auto flex flex-col gap-0.5">
        <button
          type="button"
          className={iconBtn}
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? <IoSunnyOutline /> : <FaMoon />}
        </button>
        <button
          type="button"
          onClick={onLogout}
          className={`${iconBtn} hover:text-red-500 dark:hover:text-red-400`}
          aria-label="Log out"
          title="Log out"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
