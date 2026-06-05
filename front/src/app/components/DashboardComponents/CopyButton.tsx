import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface CopyButtonDashboardProps {
  code: string;
}

const CopyButtonDashboard: React.FC<CopyButtonDashboardProps> = ({ code }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast("Copied to clipboard", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent px-4 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-white sm:w-auto"
    >
      <IoCopyOutline className="h-5 w-5" />
      <span>Copy</span>
    </button>
  );
};

export default CopyButtonDashboard;
