import React from "react";
import TokenDisplay from "./TokenDisplay";

interface TokenActionsProps {
  formToken: string | null;
  generateFormToken: () => void;
  deleteFormToken: () => void;
}

const TokenActions: React.FC<TokenActionsProps> = ({
  formToken,
  generateFormToken,
  deleteFormToken,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      {formToken ? (
        <TokenDisplay formToken={formToken} deleteFormToken={deleteFormToken} />
      ) : (
        <div>
          <p className="text-gray-700 font-semibold mb-4">No hay Form Token</p>
          <button
            onClick={generateFormToken}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Generar Form Token
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenActions;
