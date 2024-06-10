"use client";
import React, { useState } from "react";
import SVGAmail from "../LoginView/components/SVG/SVGAmail";
import SVGLock from "../LoginView/components/SVG/SVGLock";
import { AiTwotoneEdit } from "react-icons/ai";
import { useAuth } from "@/app/api/AuthContext";

const RegisterView = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(name, lastName, email, password);
      setSuccess(
        "Registration successful. Please check your email to verify your account."
      );
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setSuccess(null);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-accent space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
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
        </div>
      </div>
      <div className="hidden lg:flex w-full lg:w-1/2 register_img_section justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
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
