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
    <div className={compact ? "min-h-0 flex-1" : ""}>
      <div
        className={
          compact
            ? "mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
            : ""
        }
      >
        <div>
          <p className="postal-eyebrow-dark mb-1">Security</p>
          <h2
            className={`postal-dashboard-title ${compact ? "text-base" : ""} ${compact ? "" : "mb-3 text-center sm:text-left"}`}
          >
            Form Token Management
          </h2>
        </div>
        <p
          className={`postal-dashboard-stat ${compact ? "text-xs" : "mb-6 text-center sm:text-left"}`}
        >
          <a
            className="font-semibold text-primary underline-offset-2 hover:underline dark:text-accent"
            target="_blank"
            rel="noreferrer"
            href="https://docs.mailprex.excelso.xyz"
          >
            Docs
          </a>
          {!compact ? " · Never share your token." : null}
        </p>
      </div>

      {loading ? (
        <p className="text-center text-sm text-secondary/60 dark:text-accent/70">
          Loading...
        </p>
      ) : null}
      {error ? (
        <p className="mb-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <TokenActions
        hasToken={hasToken}
        prefix={tokenPrefix}
        revealedToken={revealedToken}
        generateFormToken={generateToken}
        deleteFormToken={handleDeleteToken}
        compact={compact}
      />
    </div>
  );
};

export default FormTokenManagmentCard;
