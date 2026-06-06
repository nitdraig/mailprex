import React from "react";
import TokenDisplay from "./TokenDisplay";

interface TokenActionsProps {
  hasToken: boolean;
  prefix?: string;
  revealedToken?: string | null;
  generateFormToken: () => void;
  deleteFormToken: () => void;
  compact?: boolean;
}

const TokenActions: React.FC<TokenActionsProps> = ({
  hasToken,
  prefix,
  revealedToken,
  generateFormToken,
  deleteFormToken,
  compact = false,
}) => {
  if (hasToken || revealedToken) {
    return (
      <TokenDisplay
        prefix={prefix}
        revealedToken={revealedToken}
        deleteFormToken={deleteFormToken}
        onRegenerate={generateFormToken}
        compact={compact}
      />
    );
  }

  return (
    <div className="text-center sm:text-left">
      <p className={`postal-dashboard-stat mb-3 font-semibold ${compact ? "text-sm" : ""}`}>
        There is no form token yet.
      </p>
      <button
        type="button"
        onClick={generateFormToken}
        className="postal-btn-primary !rounded-xl !py-2 !text-xs !normal-case !tracking-normal"
      >
        Generate Form Token
      </button>
    </div>
  );
};

export default TokenActions;
