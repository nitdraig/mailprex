import React from "react";

type EmailStatsProps = {
  sentEmails: number;
  remainingEmails: string | number;
  compact?: boolean;
};

const EmailStats = ({ sentEmails, remainingEmails }: EmailStatsProps) => {
  return (
    <div>
      <p className="postal-dashboard-label mb-1">Usage</p>
      <div className="flex items-baseline gap-4">
        <div className="flex items-baseline gap-1.5">
          <span className="postal-dashboard-muted text-[10px]">Sent</span>
          <span className="text-base font-semibold leading-none text-emerald-600 dark:text-emerald-400">
            {sentEmails}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="postal-dashboard-muted text-[10px]">Left</span>
          <span className="text-base font-semibold leading-none text-rose-600 dark:text-rose-400">
            {remainingEmails}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailStats;
