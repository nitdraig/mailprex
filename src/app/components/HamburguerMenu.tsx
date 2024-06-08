import Link from "next/link";
import React from "react";

const HamburguerMenu = () => {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 list-none text-center">
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

      <div className=" md:flex items-center pt-6 pb-2 space-x-2">
        <Link
          href="/login"
          className="text-accent bg-secondary hover:text-accent/80 px-6 py-2 rounded-lg text-lg font-medium"
        >
          Start
        </Link>
      </div>
    </div>
  );
};

export default HamburguerMenu;
