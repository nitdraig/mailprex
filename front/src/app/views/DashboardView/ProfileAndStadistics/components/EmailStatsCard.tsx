import React from "react";
import { ImStatsBars } from "react-icons/im";

type EmailStatsProps = {
  sentEmails: number;
  remainingEmails: string | number;
};

const EmailStats = ({ sentEmails, remainingEmails }: EmailStatsProps) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="postal-eyebrow-dark mb-1">Usage</p>
          <h3 className="postal-dashboard-title">Your Stats</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary dark:border-accent/20 dark:bg-white/5 dark:text-accent">
          <ImStatsBars className="text-2xl" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="postal-dashboard-stat">
          Total sent emails:
          <span className="ml-2 text-emerald-600 dark:text-emerald-400">
            {sentEmails}
          </span>
        </p>
        <p className="postal-dashboard-stat">
          Remaining emails:
          <span className="ml-2 text-rose-600 dark:text-rose-400">
            {remainingEmails}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailStats;
