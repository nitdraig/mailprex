import Link from "next/link";
import { CgTemplate } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";

type DashboardSideBarProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
};

const navItemClass =
  "flex flex-col items-center gap-1.5 rounded-xl border border-transparent px-3 py-3 text-secondary/70 transition-all duration-300 hover:border-primary/15 hover:bg-white/60 hover:text-primary dark:text-accent/70 dark:hover:border-accent/20 dark:hover:bg-white/5 dark:hover:text-white";

const navItemActiveClass =
  "flex flex-col items-center gap-1.5 rounded-xl border border-primary/20 bg-white/80 px-3 py-3 text-primary shadow-sm dark:border-accent/25 dark:bg-white/10 dark:text-white";

const DashboardSideBar = ({
  toggleDarkMode,
  darkMode,
}: DashboardSideBarProps) => {
  return (
    <aside className="flex w-20 shrink-0 flex-col items-center border-r border-primary/10 bg-white/50 py-6 backdrop-blur-md dark:border-accent/15 dark:bg-primary/80 sm:w-24">
      <Link href="/" className="mb-8 hidden sm:block" aria-label="Back to home">
        <img
          className="h-10 w-10 rounded-full border border-primary/20 object-cover dark:border-accent/25"
          src="https://mailprex.excelso.xyz/logo.webp"
          alt="Mailprex"
        />
      </Link>

      <nav aria-label="Dashboard navigation" className="flex flex-1 flex-col gap-2">
        <Link href="/dashboard" className={navItemActiveClass}>
          <MdOutlineSpaceDashboard className="text-xl" />
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
            Home
          </span>
        </Link>

        <a
          href="https://docs.mailprex.excelso.xyz"
          target="_blank"
          rel="noreferrer"
          className={navItemClass}
        >
          <CgTemplate className="text-xl" />
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
            Docs
          </span>
        </a>
      </nav>

      <button
        type="button"
        className="mt-4 rounded-xl border border-primary/15 p-3 text-primary transition-colors hover:bg-white/70 dark:border-accent/20 dark:text-accent dark:hover:bg-white/10"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <IoSunnyOutline className="text-lg" />
        ) : (
          <FaMoon className="text-lg" />
        )}
      </button>
    </aside>
  );
};

export default DashboardSideBar;
