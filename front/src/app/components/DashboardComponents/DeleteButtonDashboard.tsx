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
      className={`rounded-lg border border-red-300/40 bg-red-500/90 font-bold text-white transition-colors hover:bg-red-600 ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"}`}
    >
      Delete
    </button>
  );
};

export default DeleteButtonDashboard;
