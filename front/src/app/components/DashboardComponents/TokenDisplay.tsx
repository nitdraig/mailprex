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
    className={`rounded-xl border border-primary/15 bg-primary dark:border-accent/20 dark:bg-primary/95 ${compact ? "p-3" : "rounded-2xl p-5"}`}
  >
    {revealedToken ? (
      <>
        <p className="mb-1 text-xs font-semibold text-amber-100">
          Copy now — it will not be shown again.
        </p>
        <p className="mb-3 break-all font-mono text-xs text-white">
          {revealedToken}
        </p>
        <CopyButtonDashboard code={revealedToken} compact={compact} />
      </>
    ) : (
      <>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent/80">
          Active token
        </p>
        <p className="mb-2 break-all font-mono text-sm text-white lg:text-base">
          {prefix ?? "mk_live_…"}
        </p>
        {!compact ? (
          <p className="mb-4 text-sm text-accent/80">
            Full token is only shown once when generated.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-lg border border-accent/30 bg-accent px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-white"
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
