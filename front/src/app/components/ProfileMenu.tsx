"use client";

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
        <Avatar src={photo} alt="Profile" isBordered size="md" />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-primary z-50">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
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
