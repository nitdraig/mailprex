"use client";
import { useState } from "react";
import logo from "./logo.png";
import logowhite from "../assets/logos/white.png";
import defaultAvatar from "../assets/defaultAvatar.svg";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-primary w-screen fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div>
            <a href="/#">
              <img
                className="rounded-full w-14 "
                src="https://res.cloudinary.com/draig/image/upload/v1717633081/mailprex/iwzlpdbt3uclxt5mwll3.png"
                alt="Mailprex Logo"
              />
            </a>
          </div>
          <div className="hidden md:flex flex-grow ">
            <ul className="flex ml-6 space-x-6">
              <li>
                <a
                  href="/#about"
                  className="text-accent hover:text-accent/70 px-3 py-2  text-lg font-medium"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-accent hover:text-accent/70 px-3 py-2  text-lg font-medium"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-accent hover:text-accent/70 px-3 py-2  text-lg font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/login"
              className="text-accent bg-secondary hover:text-accent/80 px-6 py-2 rounded-lg text-lg font-medium"
            >
              Start
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/40"
            >
              <span className="sr-only">Menú</span>
              <SVGHamburger isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <HamburguerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
