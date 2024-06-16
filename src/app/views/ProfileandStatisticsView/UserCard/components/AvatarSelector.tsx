// components/AvatarSelector.tsx
import React from "react";

const AvatarSelector = ({ selectedAvatar, setSelectedAvatar }: any) => {
  const avatarOptions = [
    "https://res.cloudinary.com/draig/image/upload/v1718494479/mailprex/avatars/fct0oivmlfvcmhsov2au.jpg",
    "https://res.cloudinary.com/draig/image/upload/v1718494464/mailprex/avatars/snc62ukcskkcblegezbm.jpg",
    "https://res.cloudinary.com/draig/image/upload/v1718494451/mailprex/avatars/k9puqjumdv5vlydkobyx.jpg",
    "https://res.cloudinary.com/draig/image/upload/v1718494437/mailprex/avatars/iffs2fjelpgoeqg8obip.jpg",
  ];

  return (
    <div className="grid grid-cols-4 gap-1 mt-2">
      {avatarOptions.map((avatarUrl, index) => (
        <img
          key={index}
          src={avatarUrl}
          alt={`Avatar ${index + 1}`}
          className={`cursor-pointer ${
            selectedAvatar === avatarUrl ? "border-primary border-2" : ""
          } rounded-full w-20`}
          onClick={() => setSelectedAvatar(avatarUrl)}
        />
      ))}
    </div>
  );
};

export default AvatarSelector;
