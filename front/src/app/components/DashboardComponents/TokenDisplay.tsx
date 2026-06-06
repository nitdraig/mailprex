import CopyButtonDashboard from "@/app/components/DashboardComponents/CopyButton";
import DeleteButtonDashboard from "@/app/components/DashboardComponents/DeleteButtonDashboard";
import React from "react";

interface TokenDisplayProps {
  prefix?: string;
  revealedToken?: string | null;
  deleteFormToken: () => void;
  onRegenerate: () => void;
  compact?: boolean;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  prefix,
  revealedToken,
  deleteFormToken,
  onRegenerate,
  compact = false,
}) => (
  <div>
    {revealedToken ? (
      <p className="mb-2 text-sm font-medium text-amber-600 dark:text-amber-300">
        Copy now — shown only once.
      </p>
    ) : null}
    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-[#1a2f4d] px-3 py-2.5 dark:bg-[#0d1828]">
      <code className="min-w-0 flex-1 truncate font-mono text-sm text-white">
        {revealedToken ?? prefix ?? "mk_live_…"}
      </code>
      <div className="flex shrink-0 gap-2">
        {revealedToken ? (
          <CopyButtonDashboard code={revealedToken} compact={compact} />
        ) : (
          <>
            <button
              type="button"
              onClick={onRegenerate}
              className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-primary hover:bg-accent"
            >
              Regenerate
            </button>
            <DeleteButtonDashboard
              deleteFormToken={deleteFormToken}
              compact={compact}
            />
          </>
        )}
      </div>
    </div>
  </div>
);

export default TokenDisplay;
