import React from "react";
import { HiOutlineKey } from "react-icons/hi";
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
    <div className="postal-dashboard-empty h-full min-h-[9rem]">
      <HiOutlineKey className="mb-2 text-3xl text-slate-400 dark:text-slate-500" />
      <p className="postal-dashboard-title mb-1">No token yet</p>
      <p className="postal-dashboard-muted mb-4 max-w-xs">
        Generate a private token to connect forms from your website.
      </p>
      <button
        type="button"
        onClick={generateFormToken}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 dark:bg-accent dark:text-primary dark:hover:bg-white"
      >
        Generate token
      </button>
    </div>
  );
};

export default TokenActions;
