import { useAuth } from "@/app/api/AuthContext";
import { resolveProfilePhoto } from "@/app/constants/avatars";
import Portal from "@/app/components/Portal";
import { UserData } from "@/app/types/Types";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import AvatarSelector from "./components/AvatarSelector";

type UserCardProps = {
  userData: UserData | null;
  lastEmailDate: string;
  compact?: boolean;
};

const UserCard = ({ userData, lastEmailDate, compact = false }: UserCardProps) => {
  const { updateUser, changePassword } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => {
    setSelectedAvatar(userData?.photo || "");
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
    if (!userData) return;

    try {
      const avatarUrl = selectedAvatar || userData.photo;
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

  const profilePhoto = resolveProfilePhoto(userData?.photo);

  useEffect(() => {
    if (!showModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal]);

  return (
    <>
      <div
        className={
          compact
            ? "flex w-full items-center gap-2.5"
            : ""
        }
      >
        <div
          className={`relative shrink-0 rounded-full ring-2 ring-slate-200 dark:ring-white/10 ${
            compact ? "size-9" : "mx-auto size-32"
          }`}
        >
          <img
            className={`rounded-full object-cover ${compact ? "size-9" : "size-28"}`}
            src={profilePhoto}
            alt="Profile picture"
          />
          <button
            type="button"
            className="absolute -bottom-0.5 -right-0.5 rounded-full bg-primary px-1.5 py-px text-[9px] font-medium text-white dark:bg-accent dark:text-primary"
            onClick={openModal}
          >
            Edit
          </button>
        </div>
        <div
          className={`relative z-10 min-w-0 flex-1 ${compact ? "text-left" : "mt-6 space-y-0.5 text-center"}`}
        >
          <h2 className="truncate text-xs font-semibold capitalize text-slate-900 dark:text-white">
            {userData?.name} {userData?.lastName}
          </h2>
          <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
            {userData?.email}
          </p>
          {!compact ? (
            <p className="text-sm text-secondary/60 dark:text-accent/70">
              Last activity: {lastEmailDate || "—"}
            </p>
          ) : null}
        </div>
      </div>

      {showModal ? (
        <Portal>
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-secondary/60 p-4 backdrop-blur-sm"
            onClick={closeModal}
            role="presentation"
          >
            <div
              className="postal-auth-panel max-h-[90dvh] w-full max-w-md overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-profile-title"
            >
            <p className="postal-eyebrow-dark mb-2">Profile</p>
            <h2 id="edit-profile-title" className="postal-dashboard-title mb-6">
              Edit your data
            </h2>

            <div className="postal-input mb-4">
              <input
                type="text"
                aria-label="First name"
                value={name}
                placeholder={userData?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="postal-input mb-4">
              <input
                type="text"
                aria-label="Last name"
                value={lastName}
                placeholder={userData?.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="postal-input relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                aria-label="Current password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-secondary/60 hover:text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <div className="postal-input relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                aria-label="New password"
                placeholder="New password"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-secondary/60 hover:text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {passwordError ? (
              <p className="mb-4 text-sm text-red-600">{passwordError}</p>
            ) : null}

            <div className="mb-6">
              <p className="postal-eyebrow-dark mb-3">Avatar</p>
              <AvatarSelector
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-secondary/70 hover:text-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="postal-btn-primary !rounded-xl !normal-case !tracking-normal"
                onClick={handleSaveChanges}
                disabled={passwordError !== ""}
              >
                Save changes
              </button>
            </div>
            </div>
          </div>
        </Portal>
      ) : null}
    </>
  );
};

export default UserCard;
