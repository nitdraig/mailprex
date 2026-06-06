import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface CopyButtonDashboardProps {
  code: string;
  compact?: boolean;
}

const CopyButtonDashboard: React.FC<CopyButtonDashboardProps> = ({
  code,
  compact = false,
}) => {
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent font-bold text-primary transition-colors hover:bg-white ${compact ? "px-3 py-1.5 text-xs" : "w-full px-4 py-2.5 text-sm sm:w-auto"}`}
    >
      <IoCopyOutline className="h-5 w-5" />
      <span>Copy</span>
    </button>
  );
};

export default CopyButtonDashboard;
