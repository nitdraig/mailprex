import React from "react";

const DeleteButtonDashboard = ({ deleteFormToken }: any) => {
  return (
    <button
      onClick={deleteFormToken}
      className="bg-red-500 text-white font-semibold px-6 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
    >
      Delete
    </button>
  );
};

export default DeleteButtonDashboard;
