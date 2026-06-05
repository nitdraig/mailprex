"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/api/AuthContext";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import TurnstileCaptcha from "@/app/components/TurnstileCaptcha";
import AuthHeader from "@/app/components/AuthHeader";
import { toast } from "react-toastify";

const LoginView = () => {
  const { login, isAuthenticated, isAuthReady } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthReady, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (captchaRequired && !captchaToken) {
        setError("Please complete the CAPTCHA verification");
        return;
      }

      await login(email, password, captchaToken || undefined);
      router.replace("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Bad credentials, try again";
      setError(message);
      setCaptchaToken("");
      toast.error("Bad credentials, try again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error during login:", message);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="login_img_section relative hidden lg:flex lg:w-1/2">
        <div className="relative z-10 flex min-h-dvh w-full flex-col justify-between p-10 xl:p-16">
          <AuthHeader variant="light" />
          <div className="max-w-md">
            <p className="postal-eyebrow mb-4 text-accent/80">Secure access</p>
            <h1 className="text-4xl font-bold uppercase tracking-[0.08em] text-white xl:text-5xl">
              Mailprex
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-accent/90">
              Easy way to send forms. Sign in and manage your delivery routes
              from one dashboard.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent/50">
            Trusted form delivery
          </p>
        </div>
      </aside>

      <main className="flex min-h-dvh flex-1 flex-col bg-gradient-to-b from-accent/40 to-accent/70 lg:w-1/2 lg:from-white lg:to-accent/20">
        <div className="border-b border-primary/10 bg-white/80 px-6 py-5 backdrop-blur-sm lg:hidden">
          <AuthHeader />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <LoginForm
              email={email}
              password={password}
              showPassword={showPassword}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              handleSubmit={handleSubmit}
              error={error}
              togglePasswordVisibility={togglePasswordVisibility}
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
    </div>
  );
};

export default LoginView;
