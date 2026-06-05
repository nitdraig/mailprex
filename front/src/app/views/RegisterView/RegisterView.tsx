"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/api/AuthContext";
import RegisterForm from "./components/RegisterForm";
import TurnstileCaptcha from "@/app/components/TurnstileCaptcha";
import AuthHeader from "@/app/components/AuthHeader";
import { toast } from "react-toastify";

const RegisterView = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    if (captchaRequired && !captchaToken) {
      setError("Please complete the CAPTCHA verification");
      return;
    }
    try {
      await register(name, lastName, email, password, captchaToken || undefined);
      toast.success(
        "Registration successful. Please check your email to verify your account.",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        }
      );
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setSuccess(null);
      setCaptchaToken("");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <main className="order-2 flex min-h-dvh flex-1 flex-col bg-gradient-to-b from-accent/40 to-accent/70 lg:order-1 lg:w-1/2 lg:from-white lg:to-accent/20">
        <div className="border-b border-primary/10 bg-white/80 px-6 py-5 backdrop-blur-sm lg:hidden">
          <AuthHeader />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-lg">
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
              captcha={
                <TurnstileCaptcha
                  onVerify={setCaptchaToken}
                  onExpire={() => setCaptchaToken("")}
                />
              }
            />
          </div>
        </div>
      </main>

      <aside className="register_img_section relative order-1 hidden lg:order-2 lg:flex lg:w-1/2">
        <div className="relative z-10 flex min-h-dvh w-full flex-col justify-between p-10 xl:p-16">
          <AuthHeader variant="light" />
          <div className="max-w-md">
            <p className="postal-eyebrow mb-4 text-accent/80">New route</p>
            <h1 className="text-4xl font-bold uppercase tracking-[0.08em] text-white xl:text-5xl">
              Mailprex
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-accent/90">
              The best way to send forms from your web. Create your account and
              start delivering in minutes.
            </p>
            <a
              href="https://docs.mailprex.excelso.xyz"
              target="_blank"
              rel="noreferrer"
              className="postal-btn-primary mt-8 inline-flex"
            >
              Read Docs
            </a>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent/50">
            Start delivering today
          </p>
        </div>
      </aside>
    </div>
  );
};

export default RegisterView;
