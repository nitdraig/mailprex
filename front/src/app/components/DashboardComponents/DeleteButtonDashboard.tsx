import React from "react";
import { toast } from "react-toastify";

type DeleteButtonDashboardProps = {
  deleteFormToken: () => void | Promise<void>;
  compact?: boolean;
};

const DeleteButtonDashboard = ({
  deleteFormToken,
  compact = false,
}: DeleteButtonDashboardProps) => {
  const handleDelete = async () => {
    try {
      await deleteFormToken();
      toast.info("Form token deleted", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Failed to delete token: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className={`border border-red-300/40 bg-red-500/90 font-semibold text-white transition-colors hover:bg-red-600 ${compact ? "rounded-lg px-3 py-1.5 text-sm" : "rounded-lg px-4 py-2.5 text-sm font-bold"}`}
    >
      Delete
    </button>
  );
};

export default DeleteButtonDashboard;
