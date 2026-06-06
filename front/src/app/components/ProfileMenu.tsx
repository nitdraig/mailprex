"use client";

import { resolveProfilePhoto } from "@/app/constants/avatars";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";

type ProfileMenuProps = {
  photo?: string;
  onLogout: () => void;
  hideDashboardLink?: boolean;
};

const ProfileMenu = ({
  photo,
  onLogout,
  hideDashboardLink = false,
}: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateMenuPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  };

  const toggleMenu = () => {
    if (!open) {
      updateMenuPosition();
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleReposition = () => updateMenuPosition();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={toggleMenu}
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Avatar src={resolveProfilePhoto(photo)} alt="Profile" isBordered size="md" />
      </button>

      {open ? (
        <Portal>
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-[200] w-48 overflow-hidden rounded-xl border border-accent/25 bg-primary/95 py-1 shadow-[0_12px_40px_-12px_rgba(15,28,48,0.65)] backdrop-blur-xl"
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
            }}
          >
            <div aria-hidden className="postal-route-line" />
            {!hideDashboardLink ? (
              <Link
                href="/dashboard"
                role="menuitem"
                className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-accent/90 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            ) : null}
            <button
              type="button"
              role="menuitem"
              className="block w-full px-4 py-2.5 text-left text-sm font-semibold uppercase tracking-[0.08em] text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
            >
              Log Out
            </button>
          </div>
        </Portal>
      ) : null}
    </>
  );
};

export default ProfileMenu;
