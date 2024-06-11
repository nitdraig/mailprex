"use client";
import React, { useEffect, useState } from "react";
import SVGAmail from "./components/SVG/SVGAmail";
import SVGLock from "./components/SVG/SVGLock";
import { useAuth } from "@/app/api/AuthContext";
import { useRouter } from "next/navigation";

const LoginView = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      setError("Error al iniciar sesión");
      console.error(error);
    }
  };

  return (
    <section className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className=" bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl uppercase">Mailprex</h1>
          <p className="text-white mt-1">Easy way to send forms</p>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-accent space-y-8 rounded-lg">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-white rounded-md shadow-lg p-5"
            onSubmit={handleSubmit}
          >
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Welcome Back
            </p>
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
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-primary mt-5 py-2 hover:bg-primary/80 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <a className="text-sm ml-2 hover:text-primary cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                <span> Forgot Password?</span>
              </a>
              <a
                href="/register"
                className="text-sm ml-2 hover:text-primary cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Dont have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginView;
