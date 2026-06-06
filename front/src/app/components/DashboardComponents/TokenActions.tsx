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
    <div className="postal-dashboard-empty">
      <div className="flex min-w-0 items-center gap-2">
        <HiOutlineKey className="shrink-0 text-xl text-slate-400" />
        <p className="postal-dashboard-stat">No token yet — generate one to connect your forms.</p>
      </div>
      <button
        type="button"
        onClick={generateFormToken}
        className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 dark:bg-accent dark:text-primary"
      >
        Generate
      </button>
    </div>
  );
};

export default TokenActions;
