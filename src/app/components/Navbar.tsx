// Navbar.tsx
"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import HamburguerMenu from "./HamburguerMenu";
import SVGHamburger from "./SVGHamburger";
import { useAuth } from "../api/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, logout, getUserData, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, [isAuthenticated, getUserData]);

  const toggleProfileMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
    return router.push("/login");
  };

  useEffect(() => {
    setInitialLoading(false);
    if (isAuthenticated) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isAuthenticated]);

  if (initialLoading) {
    return null;
  }

  return (
    <nav className="bg-primary w-screen fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div>
            <a href="/#">
              <img
                className="rounded-full w-14"
                src="https://res.cloudinary.com/draig/image/upload/v1717633081/mailprex/iwzlpdbt3uclxt5mwll3.png"
                alt="Mailprex Logo"
              />
            </a>
          </div>
          <div className="hidden md:flex flex-grow">
            <ul className="flex ml-6 space-x-6">
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
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated && !loading ? (
              <Dropdown className="rounded-lg">
                <DropdownTrigger>
                  <Avatar
                    name={userData ? `${userData.name} ` : "Profile"}
                    alt="Profile"
                    isBordered
                    size="md"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Link Actions">
                  <DropdownItem href="/dashboard" key="dashboard">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem
                    href="/dashboard/profile"
                    key="profile"
                    color="default"
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    onClick={handleLogout}
                    color="danger"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-accent bg-secondary hover:text-accent/80 px-6 py-2 rounded-lg text-lg font-medium"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/40"
            >
              <span className="sr-only">Menú</span>
              <SVGHamburger isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <HamburguerMenu
          handleLogout={handleLogout}
          userData={userData}
          loading={loading}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
  );
};

export default Navbar;
