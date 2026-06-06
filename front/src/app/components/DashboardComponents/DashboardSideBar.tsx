import Link from "next/link";
import { CgTemplate } from "react-icons/cg";
import { FaMoon, FaSignOutAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

type DashboardSideBarProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
  onLogout: () => void;
};

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100";

const DashboardSideBar = ({
  toggleDarkMode,
  darkMode,
  onLogout,
}: DashboardSideBarProps) => {
  return (
    <aside className="flex w-10 shrink-0 flex-col items-center border-r border-slate-200/80 bg-white py-1.5 dark:border-white/[0.06] dark:bg-[#121d30]">
      <Link href="/" className="mb-2 p-0.5" aria-label="Back to home">
        <img
          className="h-6 w-6 rounded-full border border-slate-200 object-cover dark:border-white/10"
          src="https://mailprex.excelso.xyz/logo.webp"
          alt="Mailprex"
        />
      </Link>

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
