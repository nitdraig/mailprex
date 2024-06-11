import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const HamburguerMenu = ({
  isAuthenticated,
  handleLogout,
  loading,
  userData,
}: any) => {
  return (
    <div className="px-1 pt-2 pb-3 space-y-1 sm:px-3 list-none text-center">
      <ul className=" ml-6 space-x-4">
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
            href="/#contacto"
            className="text-accent hover:text-accent/70 px-3 py-2  text-lg font-medium"
          >
            Contact
          </a>
        </li>

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
              <DropdownItem href="/profile" key="profile" color="default">
                Profile
              </DropdownItem>
              <DropdownItem key="logout" onClick={handleLogout} color="danger">
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/login"
              className="text-accent bg-secondary hover:text-accent/80 px-6 py-2 rounded-lg text-lg font-medium"
            >
              Ingresar
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default HamburguerMenu;
