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
    <div>
      <p className="postal-eyebrow-dark mb-2 text-center sm:text-left">Security</p>
      <h2 className="postal-dashboard-title mb-3 text-center sm:text-left">
        Form Token Management
      </h2>
      <p className="postal-dashboard-stat mb-6 text-center sm:text-left">
        Read the{" "}
        <a
          className="font-semibold text-primary underline-offset-2 hover:underline dark:text-accent"
          target="_blank"
          rel="noreferrer"
          href="https://docs.mailprex.excelso.xyz"
        >
          Mailprex Docs
        </a>
        . Never share your form token — it is private.
      </p>

      {loading ? (
        <p className="text-center text-sm text-secondary/60 dark:text-accent/70">
          Loading...
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <TokenActions
        hasToken={hasToken}
        prefix={tokenPrefix}
        revealedToken={revealedToken}
        generateFormToken={generateToken}
        deleteFormToken={handleDeleteToken}
      />
    </div>
  );
};

export default FormTokenManagmentCard;
