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
}: FormTokenManagmentCardProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="postal-dashboard-title">Form token</h2>
        <a
          className="shrink-0 text-sm font-medium text-primary hover:underline dark:text-accent"
          target="_blank"
          rel="noreferrer"
          href="https://docs.mailprex.excelso.xyz"
        >
          Docs →
        </a>
      </div>

      {loading ? <p className="postal-dashboard-muted">Loading...</p> : null}
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <TokenActions
        hasToken={hasToken}
        prefix={tokenPrefix}
        revealedToken={revealedToken}
        generateFormToken={generateToken}
        deleteFormToken={handleDeleteToken}
        compact
      />
    </div>
  );
};

export default FormTokenManagmentCard;
