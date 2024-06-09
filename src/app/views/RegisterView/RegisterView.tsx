import React from "react";
import SVGAmail from "../LoginView/components/SVG/SVGAmail";
import SVGLock from "../LoginView/components/SVG/SVGLock";
import { AiTwotoneEdit } from "react-icons/ai";

const RegisterView = () => {
  return (
    <div className="h-screen flex">
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-accent  space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="bg-white rounded-lg shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Welcome to Mailprex
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Register to get started
            </p>
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <AiTwotoneEdit />
              <input
                id="fullname"
                className=" pl-2 w-full outline-none border-none"
                type="fullname"
                name="fullname"
                placeholder="Fullname"
              />
            </div>
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <SVGAmail />
              <input
                id="email"
                className=" pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
              <SVGLock />
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
              <SVGLock />
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Repeat Password"
              />
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-primary mt-5 py-2  hover:bg-primary/80 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Register
            </button>
            <div className="flex justify-between mt-4">
              <a
                href="/login"
                className="text-sm ml-2 hover:text-primary cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                You have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
      <div
        className="hidden lg:flex w-full lg:w-1/2 register_img_section
          justify-around items-center"
      >
        <div
          className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
        ></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl uppercase">Mailprex</h1>
          <p className="text-white mt-1">
            The best way to send forms from your web
          </p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="/docs/introduction"
              className="hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-lg font-bold mb-2"
            >
              Read Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
