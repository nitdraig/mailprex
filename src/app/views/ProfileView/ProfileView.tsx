import React from "react";

const ProfileView = () => {
  return (
    <>
      <title>Profile | Mailprex</title>
      <div className="max-w-lg mx-auto my-10  rounded-lg shadow-md p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">John Doe</h2>
        <p className="text-center text-gray-600 mt-1">example@gmail</p>
        <div className="flex justify-center mt-5">
          <p>Your Plan:</p>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
