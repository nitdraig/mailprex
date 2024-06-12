"use client";
import React, { useState } from "react";

import { useAuth } from "@/app/api/AuthContext";
import RegisterForm from "./components/RegisterForm";

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
        <div className="w-full mt-14 px-8 md:px-32 lg:px-24">
          <RegisterForm
            handleSubmit={handleSubmit}
            error={error}
            success={success}
            name={name}
            lastName={lastName}
            email={email}
            password={password}
            setName={setName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
          />
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
