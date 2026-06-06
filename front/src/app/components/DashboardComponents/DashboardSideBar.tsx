import Link from "next/link";
import { CgTemplate } from "react-icons/cg";
import { FaMoon, FaSignOutAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

type DashboardSideBarProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
  onLogout: () => void;
};

const navItemClass =
  "flex flex-col items-center gap-1 rounded-xl border border-transparent px-2 py-2 text-secondary/70 transition-all duration-300 hover:border-primary/15 hover:bg-white/60 hover:text-primary dark:text-accent/70 dark:hover:border-accent/20 dark:hover:bg-white/5 dark:hover:text-white";

const DashboardSideBar = ({
  toggleDarkMode,
  darkMode,
  onLogout,
}: DashboardSideBarProps) => {
  return (
    <aside className="flex w-[4.5rem] shrink-0 flex-col items-center border-r border-primary/10 bg-white/50 py-4 backdrop-blur-md dark:border-accent/15 dark:bg-primary/80 sm:w-20">
      <Link href="/" className="mb-6 hidden sm:block" aria-label="Back to home">
        <img
          className="h-9 w-9 rounded-full border border-primary/20 object-cover dark:border-accent/25"
          src="https://mailprex.excelso.xyz/logo.webp"
          alt="Mailprex"
        />
      </Link>

      <nav aria-label="Dashboard navigation" className="flex flex-1 flex-col gap-2">
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

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          className="rounded-xl border border-primary/15 p-3 text-primary transition-colors hover:bg-white/70 dark:border-accent/20 dark:text-accent dark:hover:bg-white/10"
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
          className="rounded-xl border border-red-300/30 p-3 text-red-500 transition-colors hover:bg-red-500/10 dark:border-red-400/30 dark:text-red-300"
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
