import CopyButton from "@/app/components/CopyButton";
import CopyButtonDashboard from "@/app/components/DashboardComponents/CopyButton";
import DeleteButtonDashboard from "@/app/components/DashboardComponents/DeleteButtonDashboard";
import React from "react";

interface TokenDisplayProps {
  formToken: string;
  deleteFormToken: () => void;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  formToken,
  deleteFormToken,
}) => (
  <div className="dark:bg-accent bg-primary shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
    <p className="dark:text-gray-700 text-white font-semibold mb-4 break-words">
      Your Form Token: <strong>{formToken}</strong>
    </p>
    <div className="flex flex-col space-y-4">
      <DeleteButtonDashboard deleteFormToken={deleteFormToken} />
      <CopyButtonDashboard code={formToken} />
    </div>
  </div>
);

export default TokenDisplay;
