import CopyButtonDashboard from "@/app/components/DashboardComponents/CopyButton";
import DeleteButtonDashboard from "@/app/components/DashboardComponents/DeleteButtonDashboard";
import React from "react";

interface TokenDisplayProps {
  prefix?: string;
  revealedToken?: string | null;
  deleteFormToken: () => void;
  onRegenerate: () => void;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  prefix,
  revealedToken,
  deleteFormToken,
  onRegenerate,
}) => (
  <div className="rounded-2xl border border-primary/15 bg-primary p-5 dark:border-accent/20 dark:bg-primary/95">
    {revealedToken ? (
      <>
        <p className="mb-2 text-sm font-semibold text-amber-100">
          Copy your token now — it will not be shown again.
        </p>
        <p className="mb-4 break-all font-mono text-sm text-white">
          {revealedToken}
        </p>
        <CopyButtonDashboard code={revealedToken} />
      </>
    ) : (
      <>
        <p className="mb-1 text-sm font-semibold uppercase tracking-[0.1em] text-accent/80">
          Active token
        </p>
        <p className="mb-3 break-all font-mono text-lg text-white">
          {prefix ?? "mk_live_…"}
        </p>
        <p className="mb-5 text-sm text-accent/80">
          For security, the full token is only shown once when generated.
          Regenerate if you need a new copy.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-xl border border-accent/30 bg-accent px-4 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-white"
          >
            Regenerate token
          </button>
          <DeleteButtonDashboard deleteFormToken={deleteFormToken} />
        </div>
      </>
    )}
  </div>
);

export default TokenDisplay;
