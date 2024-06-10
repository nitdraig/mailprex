import CopyButton from "@/app/components/CopyButton";
import React from "react";

interface TokenDisplayProps {
  formToken: string;
  deleteFormToken: () => void;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  formToken,
  deleteFormToken,
}) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <p className="text-gray-700 font-semibold mb-4">Form Token: {formToken}</p>
    <div>
      <button
        onClick={deleteFormToken}
        className="bg-red-500 text-white font-semibold top-1 px-6 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
      >
        Eliminar Form Token
      </button>
      <CopyButton code={formToken} />
    </div>
  </div>
);

export default TokenDisplay;
