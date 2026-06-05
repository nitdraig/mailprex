import Link from "next/link";
import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SVGAmail from "./SVG/SVGAmail";
import SVGLock from "./SVG/SVGLock";

type LoginFormProps = {
  email: string;
  password: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  captcha?: React.ReactNode;
};

const LoginForm = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  error,
  showPassword,
  togglePasswordVisibility,
  captcha,
}: LoginFormProps) => {
  return (
    <form className="postal-auth-panel" onSubmit={handleSubmit}>
      <p className="postal-eyebrow-dark mb-3">Member access</p>
      <h1 className="text-2xl font-bold uppercase tracking-[0.06em] text-secondary">
        Hello Again
      </h1>
      <p className="mb-8 mt-1 text-sm text-secondary/65">Welcome back</p>

      {error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="postal-input mb-4">
        <SVGAmail />
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
          placeholder="Email address"
        />
      </div>

      <div className="postal-input mb-6">
        <SVGLock />
        <input
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
          className="text-secondary/60 transition-colors hover:text-primary"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>

      {captcha}

      <button type="submit" className="postal-btn-primary mt-5 w-full">
        Login
      </button>

      <div className="mt-5 text-center">
        <Link
          href="/register"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/70"
        >
          Don&apos;t have an account yet?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
