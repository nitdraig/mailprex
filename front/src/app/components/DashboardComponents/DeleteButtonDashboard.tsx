import React from "react";
import { toast } from "react-toastify";

const DeleteButtonDashboard = ({ deleteFormToken }: any) => {
  const Delete = deleteFormToken;
  const handleDelete = async () => {
    try {
      await Delete();
      toast.info("Form Token Deleted!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white font-semibold px-6 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
    >
      Delete
    </button>
  );
};

export default DeleteButtonDashboard;
