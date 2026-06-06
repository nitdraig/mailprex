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
}: EmailStatsProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="postal-dashboard-label mb-1">Usage</p>
          <h3 className="postal-dashboard-title">Email stats</h3>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
          <ImStatsBars className="text-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-white/[0.04]">
          <p className="postal-dashboard-muted mb-0.5">Sent</p>
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            {sentEmails}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-white/[0.04]">
          <p className="postal-dashboard-muted mb-0.5">Remaining</p>
          <p className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
            {remainingEmails}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailStats;
