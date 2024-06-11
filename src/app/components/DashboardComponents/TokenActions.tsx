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
    <div className=" w-full  ">
      {formToken ? (
        <TokenDisplay formToken={formToken} deleteFormToken={deleteFormToken} />
      ) : (
        <div>
          <p className="dark:text-gray-700 text-white font-semibold mb-4">
            There is no Form Token
          </p>
          <button
            onClick={generateFormToken}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Generate Form Token
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenActions;
