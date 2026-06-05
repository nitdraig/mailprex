import React from "react";
import {
  AVATAR_FILES,
  getAvatarPublicPath,
  getAvatarUrl,
} from "@/app/constants/avatars";

type AvatarSelectorProps = {
  selectedAvatar: string;
  setSelectedAvatar: (url: string) => void;
};

const AvatarSelector = ({
  selectedAvatar,
  setSelectedAvatar,
}: AvatarSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {AVATAR_FILES.map((file) => {
        const avatarUrl = getAvatarUrl(file);

        return (
          <button
            key={file}
            type="button"
            aria-label={`Select avatar ${file}`}
            aria-pressed={selectedAvatar === avatarUrl}
            className={`rounded-full p-0.5 transition ${
              selectedAvatar === avatarUrl
                ? "ring-2 ring-primary ring-offset-1"
                : "hover:ring-2 hover:ring-primary/40"
            }`}
            onClick={() => setSelectedAvatar(avatarUrl)}
          >
            <img
              src={getAvatarPublicPath(file)}
              alt={`Avatar ${file}`}
              className="rounded-full w-full aspect-square object-cover"
            />
          </button>
        );
      })}
    </div>
  );
};

export default AvatarSelector;
