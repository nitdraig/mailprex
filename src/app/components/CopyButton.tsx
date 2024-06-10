"use client";
import { useState } from "react";

interface CopyButtonProps {
  code: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleCopyClick}
      className="absolute top-1 right-0 mt-0 mr-2 px-6 py-1 bg-secondary text-white font-semibold shadow-lg rounded-lg transition-colors duration-300 hover:bg-primary/70 hover:text-accent"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};
export default CopyButton;
