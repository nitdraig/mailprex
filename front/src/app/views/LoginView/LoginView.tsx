"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/api/AuthContext";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { toast } from "react-toastify";

const LoginView = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast.error("Bad credentials, try again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error during login:", error.message);
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
          <LoginForm
            email={email}
            password={password}
            showPassword={showPassword}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            error={error}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginView;
