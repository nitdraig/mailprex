import { useAuth } from "@/app/api/AuthContext";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import AvatarSelector from "./components/AvatarSelector";

const UserCard = ({ userData, lastEmailDate }: any) => {
  const { updateUser, changePassword } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [photo, setPhoto] = useState(userData?.photo || "");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setName(userData?.name || "");
    setLastName(userData?.lastName || "");
    setSelectedAvatar("");
    setCurrentPassword("");
    setNewPassword("");
    setPasswordError("");
  };

  const handleSaveChanges = async () => {
    try {
      const avatarUrl = selectedAvatar || userData?.photo;
      await updateUser({
        _id: userData._id,
        email: userData.email,
        userType: userData.userType,
        requestCount: userData.requestCount,
        lastRequest: userData.lastRequest,
        name: name || userData.name,
        lastName: lastName || userData.lastName,
        photo: avatarUrl,
      });
      if (currentPassword && newPassword) {
        await changePassword(currentPassword, newPassword);
      }
      closeModal();
      toast.success("Your profile has been updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(
        "An error occurred while updating your profile. Please Check your password",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
    }
  };

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

  const selectAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const avatarOptions = [
    "https://res.cloudinary.com/draig/image/upload/v1718494479/mailprex/avatars/fct0oivmlfvcmhsov2au.jpg",
    "https://res.cloudinary.com/draig/image/upload/v1718494464/mailprex/avatars/snc62ukcskkcblegezbm.jpg",
    "https://res.cloudinary.com/draig/image/upload/v1718494451/mailprex/avatars/k9puqjumdv5vlydkobyx.jpg",
    "https://res.cloudinary.com/draig/image/upload/v1718494437/mailprex/avatars/iffs2fjelpgoeqg8obip.jpg",
  ];

  return (
    <>
      <div className="relative aspect-square rounded-full size-32 flex border mx-auto dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={userData?.photo}
          alt="Profile picture"
        />
        <button
          className="absolute top-2 right-2 bg-primary text-white rounded-full p-2 hover:bg-primary/80 focus:outline-none"
          onClick={openModal}
        >
          Edit
        </button>
      </div>
      <div className="mt-6 text-center relative z-10 space-y-2">
        <h2 className="text-xl font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
          {userData?.name} {userData?.lastName}
        </h2>
        <p className="dark:text-gray-300 text-gray-700 text-lg">
          Your Email:{" "}
          <span className="dark:text-accent text-primary">
            {userData?.email}
          </span>
        </p>
        <p className="dark:text-gray-300 text-gray-700 text-sm">
          Account From: {lastEmailDate}
        </p>
      </div>

      {showModal && (
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
                placeholder={userData.name}
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
                placeholder={userData.lastName}
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
                  <AiOutlineEyeInvisible className="dark:text-white text-black" />
                ) : (
                  <AiOutlineEye className="dark:text-white text-black" />
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
                className="absolute right-3 top-1/2 transform mt-3 -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="dark:text-white text-black" />
                ) : (
                  <AiOutlineEye className="dark:text-white  text-black" />
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
      )}
    </>
  );
};

export default UserCard;
