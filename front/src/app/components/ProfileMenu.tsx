"use client";

import { resolveProfilePhoto } from "@/app/constants/avatars";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

type ProfileMenuProps = {
  photo?: string;
  onLogout: () => void;
};

const ProfileMenu = ({ photo, onLogout }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Avatar src={resolveProfilePhoto(photo)} alt="Profile" isBordered size="md" />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-3 w-48 overflow-hidden rounded-xl border border-accent/25 bg-primary/95 py-1 shadow-[0_12px_40px_-12px_rgba(15,28,48,0.65)] backdrop-blur-xl">
          <div aria-hidden className="postal-route-line" />
          <Link
            href="/dashboard"
            className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-accent/90 transition-colors hover:bg-white/5 hover:text-white"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <button
            type="button"
            className="block w-full px-4 py-2.5 text-left text-sm font-semibold uppercase tracking-[0.08em] text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            Log Out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileMenu;
