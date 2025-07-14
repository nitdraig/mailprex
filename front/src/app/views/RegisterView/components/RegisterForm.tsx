import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiTwotoneEdit,
} from "react-icons/ai";
import SVGLock from "../../LoginView/components/SVG/SVGLock";
import SVGAmail from "../../LoginView/components/SVG/SVGAmail";

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
}: any) => {
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

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
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
          <AiTwotoneEdit />
          <input
            id="name"
            className="pl-2 outline-none border-none"
            type="text"
            name="name"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
          <AiTwotoneEdit />
          <input
            id="lastname"
            className="pl-2 outline-none border-none"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl relative">
        <SVGAmail />
        <input
          id="email"
          className="pl-2 outline-none border-none w-full"
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl relative">
        <SVGLock />
        <input
          className="pl-2 outline-none border-none w-full"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl relative">
        <SVGLock />
        <input
          className="pl-2 outline-none border-none w-full"
          type={showRepeatPassword ? "text" : "password"}
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={toggleRepeatPasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
        >
          {showRepeatPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {passwordError && <p className="text-red-500">{passwordError}</p>}
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
