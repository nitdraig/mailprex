import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SVGAmail from "./SVG/SVGAmail";
import SVGLock from "./SVG/SVGLock";

const LoginForm = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  error,
  showPassword,
  togglePasswordVisibility,
}: any) => {
  return (
    <>
      <form
        className="bg-white rounded-md shadow-lg p-5"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <SVGAmail />
          <input
            id="email"
            className=" pl-2 w-full outline-none border-none"
            type="email"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"
          />
        </div>
        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
          <SVGLock />
          <input
            className="pl-2 w-full outline-none border-none"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2 focus:outline-none"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <button
          type="submit"
          className="block w-full rounded-lg bg-primary mt-5 py-2 hover:bg-primary/80 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
        >
          Login
        </button>
        <div className="flex justify-between mt-4">
          {/* <a className="text-sm ml-2 hover:text-primary cursor-pointer hover:-translate-y-1 duration-500 transition-all">
            <span> Forgot Password?</span>
          </a> */}
          <a
            href="/register"
            className="text-sm ml-2 hover:text-primary cursor-pointer hover:-translate-y-1 duration-500 transition-all"
          >
            Dont have an account yet?
          </a>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
