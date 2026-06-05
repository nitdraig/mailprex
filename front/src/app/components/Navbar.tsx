"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import HamburguerMenu from "./HamburguerMenu";
import ProfileMenu from "./ProfileMenu";
import SVGHamburger from "./SVGHamburger";
import { useAuth } from "../api/AuthContext";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#contact", label: "Contact" },
] as const;

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <li>
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-flex items-center px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent/85 transition-colors duration-300 hover:text-white"
    >
      {label}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-3 right-3 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-white to-accent transition-transform duration-300 group-hover:scale-x-100"
      />
    </a>
  </li>
);

const Navbar = () => {
  const { isAuthenticated, isAuthReady, logout, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const closeNavbar = () => setIsOpen(false);

  const handleLogout = async () => {
    closeNavbar();
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={`pointer-events-auto mx-auto max-w-7xl overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${scrolled
            ? "border-accent/25 bg-primary/95 shadow-[0_12px_40px_-12px_rgba(15,28,48,0.65)] backdrop-blur-xl"
            : "border-accent/15 bg-primary/88 shadow-[0_4px_24px_-8px_rgba(15,28,48,0.45)] backdrop-blur-md"
          }`}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />

        <div
          className={`relative px-4 transition-all duration-500 sm:px-6 lg:px-8 ${scrolled ? "py-2.5" : "py-3.5"
            }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/#"
              className="group flex shrink-0 items-center gap-3"
              onClick={closeNavbar}
            >
              <span className="relative">
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-full bg-accent/0 blur-md transition-all duration-500 group-hover:bg-accent/25"
                />
                <img
                  className="relative h-11 w-11 rounded-full border border-accent/30 object-cover shadow-inner transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12"
                  src="https://mailprex.excelso.xyz/logo.webp"
                  alt="Mailprex Logo"
                />
              </span>
              <span className="hidden flex-col sm:flex">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent/70">
                  Excelso
                </span>
                <span className="-mt-0.5 text-lg font-bold uppercase tracking-[0.08em] text-white">
                  Mailprex
                </span>
              </span>
            </Link>

            <ul className="hidden items-center md:flex md:gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </ul>

            <div className="hidden items-center gap-3 md:flex">
              {isAuthenticated && isAuthReady ? (
                <ProfileMenu photo={userData?.photo} onLogout={handleLogout} />
              ) : !isAuthReady ? (
                <div
                  aria-hidden
                  className="h-10 w-10 animate-pulse rounded-full border border-accent/20 bg-accent/10"
                />
              ) : (
                <Link
                  href="/login"
                  className="relative overflow-hidden rounded-full border border-accent/30 bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-primary shadow-[0_4px_14px_rgba(220,224,230,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(220,224,230,0.35)]"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={toggleNavbar}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-panel"
              className="inline-flex items-center justify-center rounded-xl border border-accent/20 p-2.5 text-accent transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
            >
              <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
              <SVGHamburger isOpen={isOpen} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              id="mobile-nav-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-accent/15 md:hidden"
            >
              <HamburguerMenu
                handleLogout={handleLogout}
                userData={userData}
                isAuthReady={isAuthReady}
                isAuthenticated={isAuthenticated}
                onNavigate={closeNavbar}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
