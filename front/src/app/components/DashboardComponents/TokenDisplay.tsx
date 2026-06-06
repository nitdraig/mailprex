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
      <p className="mb-1 text-[9px] font-medium text-amber-600 dark:text-amber-300">
        Copy now — shown only once.
      </p>
    ) : null}
    <div className="flex flex-wrap items-center gap-1.5 rounded bg-[#1a2f4d] px-2 py-1.5 dark:bg-[#0d1828]">
      <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-white">
        {revealedToken ?? prefix ?? "mk_live_…"}
      </code>
      <div className="flex shrink-0 gap-1.5">
        {revealedToken ? (
          <CopyButtonDashboard code={revealedToken} compact={compact} />
        ) : (
          <>
            <button
              type="button"
              onClick={onRegenerate}
              className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-primary hover:bg-accent"
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
