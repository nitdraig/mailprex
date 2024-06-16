// components/UserEditModal.tsx
import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AvatarSelector from "./AvatarSelector";

const UserEditModal = ({
  name,
  setName,
  lastName,
  setLastName,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  passwordError,
  setPasswordError,
  selectedAvatar,
  setSelectedAvatar,
  closeModal,
  handleSaveChanges,
}: any) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed mt-20 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Edit Your Data
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="mt-1 p-1 block w-full text-grey-900 dark:text-gray-100 border-gray-900 dark:border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={name}
            placeholder="First Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="mt-1 p-1 text-grey-900 dark:text-gray-100 block w-full border-gray-900 dark:border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="mt-1 p-1 block w-full text-grey-900 dark:text-gray-100 border-gray-900 dark:border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute p-1 right-3 top-1/2 mt-3 transform -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="text-white" />
            ) : (
              <AiOutlineEye className="text-white" />
            )}
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="mt-1 p-1 block w-full text-grey-900  dark:text-gray-100 border-gray-900 dark:border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform mt-3  -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="text-white" />
            ) : (
              <AiOutlineEye className="text-white" />
            )}
          </button>
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Avatar
          </label>
          <AvatarSelector
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/80"
            onClick={handleSaveChanges}
            disabled={passwordError !== ""}
          >
            Save Changes
          </button>
          <button
            className="ml-2 text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
