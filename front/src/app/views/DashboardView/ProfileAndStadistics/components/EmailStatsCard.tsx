import React from "react";
import { ImStatsBars } from "react-icons/im";

type EmailStatsProps = {
  sentEmails: number;
  remainingEmails: string | number;
  compact?: boolean;
};

const EmailStats = ({
  sentEmails,
  remainingEmails,
  compact = false,
}: EmailStatsProps) => {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="postal-eyebrow-dark mb-0.5">Usage</p>
          <h3 className={`postal-dashboard-title ${compact ? "text-base" : ""}`}>
            Your Stats
          </h3>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary dark:border-accent/20 dark:bg-white/5 dark:text-accent">
          <ImStatsBars className="text-xl" />
        </div>
      </div>

      <div className={compact ? "space-y-1.5" : "space-y-3"}>
        <p className={`postal-dashboard-stat ${compact ? "text-sm" : ""}`}>
          Sent:{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            {sentEmails}
          </span>
        </p>
        <p className={`postal-dashboard-stat ${compact ? "text-sm" : ""}`}>
          Remaining:{" "}
          <span className="text-rose-600 dark:text-rose-400">
            {remainingEmails}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailStats;
