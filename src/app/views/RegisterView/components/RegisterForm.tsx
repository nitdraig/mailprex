import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import SVGLock from "../../LoginView/components/SVG/SVGAmail";
import SVGAmail from "../../LoginView/components/SVG/SVGAmail";

const RegisterForm = ({
  handleSubmit,
  error,
  success,
  name,
  lastName,
  email,
  password,
  setName,
  setLastName,
  setEmail,
  setPassword,
  repeatPassword,
  setRepeatPassword,
}: any) => {
  return (
    <form
      className="bg-white rounded-lg shadow-2xl p-5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">
        Welcome to Mailprex
      </h1>
      <p className="text-sm font-normal text-gray-600 mb-8">
        Register to get started
      </p>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
        <AiTwotoneEdit />
        <input
          id="fullname"
          className="pl-2 w-full outline-none border-none"
          type="text"
          name="fullname"
          placeholder="Fullname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
        <AiTwotoneEdit />
        <input
          id="lastname"
          className="pl-2 w-full outline-none border-none"
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
        <SVGAmail />
        <input
          id="email"
          className="pl-2 w-full outline-none border-none"
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
        <SVGLock />
        <input
          className="pl-2 w-full outline-none border-none"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
        <SVGLock />
        <input
          className="pl-2 w-full outline-none border-none"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="block w-full rounded-lg bg-primary mt-5 py-2 hover:bg-primary/80 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
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
  );
};

export default RegisterForm;
