import React from "react";

const Navbar = () => {
  return (
    <header className="bg-primary w-full text-white p-4 z-50 fixed">
      <nav className="max-w-7xl mx-auto">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/docs/introduction" className="hover:underline">
              Docs
            </a>
          </li>
          <li>
            <a href="/login" className="hover:underline">
              Login
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:underline">
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
