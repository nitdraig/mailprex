import React from "react";

type EmailStatsProps = {
  sentEmails: number;
  remainingEmails: string | number;
  compact?: boolean;
};

const EmailStats = ({ sentEmails, remainingEmails }: EmailStatsProps) => {
  return (
    <div className="space-y-3">
      <p className="postal-dashboard-label">Usage</p>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="postal-dashboard-muted mb-1 text-sm">Sent</p>
          <p className="text-2xl font-semibold leading-none text-emerald-600 dark:text-emerald-400">
            {sentEmails}
          </p>
        </div>
        <div className="text-right">
          <p className="postal-dashboard-muted mb-1 text-sm">Remaining</p>
          <p className="text-2xl font-semibold leading-none text-rose-600 dark:text-rose-400">
            {remainingEmails}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailStats;
