import Link from "next/link";
import { CgTemplate } from "react-icons/cg";
import { FaMoon, FaSignOutAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

type DashboardSideBarProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
  onLogout: () => void;
};

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100";

const DashboardSideBar = ({
  toggleDarkMode,
  darkMode,
  onLogout,
}: DashboardSideBarProps) => {
  return (
    <aside className="flex w-16 shrink-0 flex-col items-center border-r border-slate-200/80 bg-white py-4 dark:border-white/[0.06] dark:bg-[#121d30] sm:w-[4.5rem]">
      <Link
        href="/"
        className="mb-6 rounded-lg p-1 transition-opacity hover:opacity-80"
        aria-label="Back to home"
      >
        <img
          className="h-9 w-9 rounded-full border border-slate-200 object-cover dark:border-white/10"
          src="https://mailprex.excelso.xyz/logo.webp"
          alt="Mailprex"
        />
      </Link>

      <nav aria-label="Dashboard navigation" className="flex flex-col gap-1">
        <a
          href="https://docs.mailprex.excelso.xyz"
          target="_blank"
          rel="noreferrer"
          className={iconButtonClass}
          title="Documentation"
        >
          <CgTemplate className="text-lg" />
        </a>
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        <button
          type="button"
          className={iconButtonClass}
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <IoSunnyOutline className="text-lg" />
          ) : (
            <FaMoon className="text-lg" />
          )}
        </button>

        <button
          type="button"
          onClick={onLogout}
          className={`${iconButtonClass} hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400`}
          aria-label="Log out"
          title="Log out"
        >
          <FaSignOutAlt className="text-lg" />
        </button>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
