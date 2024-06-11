import React from "react";
import { IoCopyOutline } from "react-icons/io5";

interface CopyButtonDashboardProps {
  code: string;
}

const CopyButtonDashboard: React.FC<CopyButtonDashboardProps> = ({ code }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 text-white font-semibold px-6 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2"
    >
      <IoCopyOutline className="h-5 w-5 text-white" />
      <span>Copy</span>
    </button>
  );
};

export default CopyButtonDashboard;
