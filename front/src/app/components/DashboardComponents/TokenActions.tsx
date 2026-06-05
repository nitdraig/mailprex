import React from "react";
import TokenDisplay from "./TokenDisplay";

interface TokenActionsProps {
  hasToken: boolean;
  prefix?: string;
  revealedToken?: string | null;
  generateFormToken: () => void;
  deleteFormToken: () => void;
}

const TokenActions: React.FC<TokenActionsProps> = ({
  hasToken,
  prefix,
  revealedToken,
  generateFormToken,
  deleteFormToken,
}) => {
  if (hasToken || revealedToken) {
    return (
      <TokenDisplay
        prefix={prefix}
        revealedToken={revealedToken}
        deleteFormToken={deleteFormToken}
        onRegenerate={generateFormToken}
      />
    );
  }

  return (
    <div className="text-center sm:text-left">
      <p className="postal-dashboard-stat mb-4 font-semibold">
        There is no form token yet.
      </p>
      <button
        type="button"
        onClick={generateFormToken}
        className="postal-btn-primary !rounded-xl !normal-case !tracking-normal"
      >
        Generate Form Token
      </button>
    </div>
  );
};

export default TokenActions;
