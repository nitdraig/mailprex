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
  <div
    className={`rounded-lg border border-primary/20 bg-[#1e3354] ${compact ? "p-3" : "p-4"} dark:border-white/10 dark:bg-[#0f1c2e]`}
  >
    {revealedToken ? (
      <>
        <p className="mb-2 text-xs font-medium text-amber-200/90">
          Copy now — it will not be shown again.
        </p>
        <p className="mb-3 break-all rounded-md bg-black/20 px-2 py-2 font-mono text-xs text-white">
          {revealedToken}
        </p>
        <CopyButtonDashboard code={revealedToken} compact={compact} />
      </>
    ) : (
      <>
        <p className="postal-dashboard-label mb-1 text-slate-400">Active token</p>
        <p className="mb-3 break-all rounded-md bg-black/20 px-2 py-2 font-mono text-sm text-white">
          {prefix ?? "mk_live_…"}
        </p>
        {!compact ? (
          <p className="postal-dashboard-muted mb-3 text-slate-400">
            Full token is only shown once when generated.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-accent"
          >
            Regenerate
          </button>
          <DeleteButtonDashboard
            deleteFormToken={deleteFormToken}
            compact={compact}
          />
        </div>
      </>
    )}
  </div>
);

export default TokenDisplay;
