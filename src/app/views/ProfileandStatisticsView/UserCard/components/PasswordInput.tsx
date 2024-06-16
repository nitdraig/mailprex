import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  label,
  password,
  setPassword,
  passwordError,
  setPasswordError,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={showPassword ? "text" : "password"}
        className="mt-1 p-1 block w-full text-grey-900 dark:text-gray-100 border-gray-900 dark:border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
      >
        {showPassword ? (
          <AiOutlineEyeInvisible className="dark:text-white text-secondary" />
        ) : (
          <AiOutlineEye className="dark:text-white text-secondary" />
        )}
      </button>
      {passwordError && (
        <p className="text-red-600 text-sm mt-1">{passwordError}</p>
      )}
    </div>
  );
};

export default PasswordInput;
