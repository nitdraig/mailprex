import TokenActions from "@/app/components/DashboardComponents/TokenActions";
import React from "react";

interface FormTokenManagmentCardProps {
  loading: boolean;
  error: string | null;
  hasToken: boolean;
  tokenPrefix?: string;
  revealedToken?: string | null;
  generateToken: () => void;
  handleDeleteToken: () => void;
  compact?: boolean;
}

const FormTokenManagmentCard = ({
  loading,
  error,
  hasToken,
  tokenPrefix,
  revealedToken,
  generateToken,
  handleDeleteToken,
  compact = false,
}: FormTokenManagmentCardProps) => {
  return (
    <div className={`flex h-full min-h-0 flex-col ${compact ? "gap-3" : "gap-4"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="postal-dashboard-label mb-1">Security</p>
          <h2 className="postal-dashboard-title">Form token</h2>
        </div>
        <a
          className="shrink-0 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-accent dark:hover:bg-white/5"
          target="_blank"
          rel="noreferrer"
          href="https://docs.mailprex.excelso.xyz"
        >
          View docs
        </a>
      </div>

      {loading ? (
        <p className="postal-dashboard-muted text-center">Loading...</p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <TokenActions
          hasToken={hasToken}
          prefix={tokenPrefix}
          revealedToken={revealedToken}
          generateFormToken={generateToken}
          deleteFormToken={handleDeleteToken}
          compact={compact}
        />
      </div>
    </div>
  );
};

export default FormTokenManagmentCard;
