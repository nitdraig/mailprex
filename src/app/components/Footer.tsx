import React from "react";
import { FaGithub, FaLinkedin, FaNpm } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import Terms from "./Terms";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tl z-10 from-primary/70  via-primary to-primary/60 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:flex md:items-center lg:flex ">
            <img
              src="/logo.png"
              alt="Mailprex Logo"
              className="h-12 md:h-16 float"
              loading="lazy"
            />
            <p className="mt-2 md:mt-0 md:ml-4 text-accent text-center md:text-left">
              Mailprex - your definitive solution for sending email from the
              web.
            </p>
          </div>

          <div className="lg:flex hidden flex-col md:flex-row md:space-x-8 text-center md:text-left">
            <a href="/#features" className="mb-2 md:mb-0 hover:underline">
              Features
            </a>
            <a href="/#pricing" className="mb-2 md:mb-0 hover:underline">
              Pricing
            </a>
            <a href="/#about" className="mb-2 md:mb-0 hover:underline">
              About Us
            </a>
            <a href="/#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-white mt-8 pt-4 text-center md:text-left">
          <div className="flex justify-center text-center mb-4 mt-2">
            <a
              href="https://www.linkedin.com/in/avellaneda-agustín-tns/"
              target="_blank"
              className="mx-2 text-3xl text-accent hover:text-secondary transition  duration-300  "
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.github.com/nitdraig"
              target="_blank"
              className="mx-2 text-3xl  text-accent hover:text-secondary  transition duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://docs.mailprex.top"
              target="_blank"
              className="mx-2 text-3xl text-accent hover:text-secondary transition duration-300"
            >
              <IoDocumentTextSharp />
            </a>
            <a
              href="https://www.npmjs.com/package/usemailprex-react"
              target="_blank"
              className="mx-2 text-3xl  text-accent hover:text-secondary transition duration-300"
            >
              <FaNpm />
            </a>
          </div>
          <div className="flex justify-center text-center">
            <p className="text-sm">
              &copy; 2024 Mailprex. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center text-center transition duration-300">
            <Terms />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
