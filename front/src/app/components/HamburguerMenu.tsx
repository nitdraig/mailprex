import Link from "next/link";
import { motion } from "framer-motion";
import ProfileMenu from "./ProfileMenu";
import { UserData } from "@/app/types/Types";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#contact", label: "Contact" },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + index * 0.06, duration: 0.28 },
  }),
};

const HamburguerMenu = ({
  isAuthenticated,
  isAuthReady,
  handleLogout,
  userData,
  onNavigate,
}: {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  handleLogout: () => void;
  userData: UserData | null;
  onNavigate?: () => void;
}) => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <ul className="flex flex-col items-center gap-1">
        {NAV_LINKS.map((link, index) => (
          <motion.li
            key={link.href}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="w-full"
          >
            <a
              href={link.href}
              onClick={onNavigate}
              className="block rounded-xl px-4 py-3 text-center text-base font-semibold uppercase tracking-[0.14em] text-accent/90 transition-colors duration-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          </motion.li>
        ))}

        <motion.li
          custom={NAV_LINKS.length}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-4 w-full border-t border-accent/15 pt-5"
        >
          {isAuthenticated && isAuthReady ? (
            <div className="flex justify-center">
              <ProfileMenu photo={userData?.photo} onLogout={handleLogout} />
            </div>
          ) : !isAuthReady ? (
            <div
              aria-hidden
              className="mx-auto h-10 w-10 animate-pulse rounded-full border border-accent/20 bg-accent/10"
            />
          ) : (
            <Link
              href="/login"
              onClick={onNavigate}
              className="block rounded-full border border-accent/30 bg-accent px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-primary transition-all duration-300 hover:bg-white"
            >
              Login
            </Link>
          )}
        </motion.li>
      </ul>
    </div>
  );
};

export default HamburguerMenu;
