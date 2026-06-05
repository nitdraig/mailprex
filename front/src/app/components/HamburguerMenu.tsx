import Link from "next/link";
import React from "react";
import ProfileMenu from "./ProfileMenu";
import { UserData } from "@/app/types/Types";

const HamburguerMenu = ({
  isAuthenticated,
  handleLogout,
  loading,
  userData,
}: {
  isAuthenticated: boolean;
  handleLogout: () => void;
  loading: boolean;
  userData: UserData | null;
}) => {
  return (
    <div className="px-1 pt-2 pb-3 space-y-1 sm:px-3 list-none text-center">
      <ul className="ml-6 space-x-4">
        <li>
          <a
            href="/#about"
            className="text-accent hover:text-accent/70 px-3 py-2 text-lg font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/#features"
            className="text-accent hover:text-accent/70 px-3 py-2 text-lg font-medium"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="/#contact"
            className="text-accent hover:text-accent/70 px-3 py-2 text-lg font-medium"
          >
            Contact
          </a>
        </li>

        {isAuthenticated && !loading ? (
          <li className="mt-4 flex justify-center">
            <ProfileMenu photo={userData?.photo} onLogout={handleLogout} />
          </li>
        ) : (
          <li className="mt-4">
            <Link
              href="/login"
              className="text-accent bg-secondary hover:text-accent/80 px-6 py-2 rounded-lg text-lg font-medium"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default HamburguerMenu;
