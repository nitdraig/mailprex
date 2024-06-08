import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:flex md:items-center">
            <img src="/logo.png" alt="Mailprex Logo" className="h-12 md:h-16" />
            <p className="mt-2 md:mt-0 md:ml-4 text-center md:text-left">
              Mailprex - Your ultimate email marketing solution.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
            <a href="#features" className="mb-2 md:mb-0 hover:underline">
              Features
            </a>
            <a href="#pricing" className="mb-2 md:mb-0 hover:underline">
              Pricing
            </a>
            <a href="#about" className="mb-2 md:mb-0 hover:underline">
              About Us
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <a href="#" className="mx-2 hover:text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.404.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.691c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.465.099 2.797.144v3.243h-1.918c-1.506 0-1.797.715-1.797 1.763v2.312h3.594l-.468 3.622h-3.126V24h6.128c.73 0 1.325-.596 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z"></path>
              </svg>
            </a>
            <a href="#" className="mx-2 hover:text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.718 0-4.92 2.202-4.92 4.917 0 .385.044.76.128 1.12-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.803-.026-1.56-.246-2.22-.616v.062c0 2.364 1.68 4.336 3.918 4.779-.41.111-.843.171-1.287.171-.315 0-.622-.031-.921-.088.623 1.946 2.432 3.362 4.576 3.402-1.675 1.313-3.787 2.098-6.078 2.098-.395 0-.785-.023-1.17-.068 2.168 1.392 4.744 2.205 7.514 2.205 9.025 0 13.963-7.481 13.963-13.963 0-.213-.005-.425-.014-.637.959-.691 1.792-1.557 2.449-2.543z"></path>
              </svg>
            </a>
            <a href="#" className="mx-2 hover:text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M19.994 3H4.002C3.451 3 3 3.451 3 4.002v15.995C3 20.551 3.451 21 4.002 21h15.993c.552 0 1.005-.449 1.005-1.003V4.002C21 3.451 20.546 3 19.994 3zM8.566 17.431H5.431V10h3.135v7.431zM6.999 8.763c-1.011 0-1.832-.821-1.832-1.832s.821-1.832 1.832-1.832 1.832.821 1.832 1.832-.821 1.832-1.832 1.832zm10.432 8.668h-3.135v-3.73c0-.89-.017-2.032-1.237-2.032-1.238 0-1.428.968-1.428 1.969v3.792h-3.135V10h3.011v1.008h.044c.419-.794 1.442-1.629 2.968-1.629 3.172 0 3.756 2.087 3.756 4.798v4.253h-.001z"></path>
              </svg>
            </a>
          </div>
          <p className="text-sm">&copy; 2024 Mailprex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
