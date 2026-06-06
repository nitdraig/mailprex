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
            ? "flex w-full flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-4"
            : ""
        }
      >
        <div
          className={`relative flex shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 dark:border-accent/20 dark:bg-white/5 ${
            compact ? "size-20 lg:size-[4.5rem]" : "mx-auto size-32"
          }`}
        >
          <img
            className={`rounded-full object-cover ${compact ? "size-[4.25rem] lg:size-16" : "size-28"}`}
            src={profilePhoto}
            alt="Profile picture"
          />
          <button
            type="button"
            className="absolute -right-1 top-0 rounded-full border border-accent/30 bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary/85"
            onClick={openModal}
          >
            Edit
          </button>
        </div>
        <div
          className={`relative z-10 space-y-1 text-center ${compact ? "min-w-0 lg:text-left" : "mt-6"}`}
        >
          <p className="postal-eyebrow-dark">Profile</p>
          <h2 className={`postal-dashboard-title ${compact ? "text-base" : ""}`}>
            {userData?.name} {userData?.lastName}
          </h2>
          <p className={`postal-dashboard-stat ${compact ? "text-sm" : ""}`}>
            <span className="block truncate font-semibold text-primary dark:text-accent">
              {userData?.email}
            </span>
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
