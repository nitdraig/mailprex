import React from "react";

const UserCard = ({ userData, lastEmailDate }: any) => {
  return (
    <div>
      <div className="relative aspect-square rounded-full size-32 flex border mx-auto dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={userData?.photo}
          alt="Profile picture"
        />
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
          Acount From: {lastEmailDate}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
