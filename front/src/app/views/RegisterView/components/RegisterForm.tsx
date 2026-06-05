import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiTwotoneEdit,
} from "react-icons/ai";
import SVGLock from "../../LoginView/components/SVG/SVGLock";
import SVGAmail from "../../LoginView/components/SVG/SVGAmail";

type RegisterFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  success: string | null;
  name: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  setName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  captcha?: React.ReactNode;
};

const RegisterForm = ({
  handleSubmit,
  error,
  success,
  name,
  lastName,
  email,
  password,
  repeatPassword,
  setName,
  setLastName,
  setEmail,
  setPassword,
  setRepeatPassword,
  captcha,
}: RegisterFormProps) => {
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword((prev) => !prev);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("Password must contain at least one number");
    } else if (!/[!?¿¡@#$%^&*]/.test(newPassword)) {
      setPasswordError("Password must contain at least one special character");
    } else {
      setPasswordError("");
    }
  };

  return (
    <form className="postal-auth-panel" onSubmit={handleSubmit}>
      <p className="postal-eyebrow-dark mb-3">Create account</p>
      <h1 className="text-2xl font-bold uppercase tracking-[0.06em] text-secondary">
        Welcome to Mailprex
      </h1>
      <p className="mb-6 mt-1 text-sm text-secondary/65">
        Register to get started
      </p>

      {error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mb-4 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {success}
        </p>
      ) : null}

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="postal-input">
          <AiTwotoneEdit className="text-secondary/60" />
          <input
            id="name"
            type="text"
            name="name"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="postal-input">
          <AiTwotoneEdit className="text-secondary/60" />
          <input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="postal-input mb-4">
        <SVGAmail />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="postal-input mb-4">
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
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      <div className="postal-input mb-4">
        <SVGLock />
        <input
          type={showRepeatPassword ? "text" : "password"}
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={toggleRepeatPasswordVisibility}
          className="text-secondary/60 transition-colors hover:text-primary"
          aria-label={showRepeatPassword ? "Hide password" : "Show password"}
        >
          {showRepeatPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      {passwordError ? (
        <p className="mb-4 text-sm text-red-600">{passwordError}</p>
      ) : null}

      {captcha}

      <button type="submit" className="postal-btn-primary mt-5 w-full">
        Register
      </button>

      <div className="mt-5 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/70"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
