import React from "react";
import defaultAvatar from "@/app/assets/defaultAvatar.svg";

const MAILPREX_LOGO = "https://mailprex.excelso.xyz/logo.webp";

type LastSentCardProps = {
  lastEmailDate: string;
  compact?: boolean;
};

const LastSentCard = ({ lastEmailDate }: LastSentCardProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div>
        <p className="postal-dashboard-label mb-1">Activity</p>
        <h2 className="postal-dashboard-title mb-1">Last delivery</h2>
        <p className="text-lg font-medium text-primary dark:text-accent">
          {lastEmailDate || "No sends yet"}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-3 dark:bg-white/[0.04]">
        <div className="flex flex-col items-center gap-1">
          <img
            className="h-7 w-7 rounded-full border border-slate-200 object-cover dark:border-white/10"
            src={defaultAvatar.src}
            alt="Your website"
          />
          <span className="postal-dashboard-muted">Web</span>
        </div>

        <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />

        <div className="flex flex-col items-center gap-1">
          <img
            className="h-8 w-8 rounded-full border border-slate-200 object-cover dark:border-white/10"
            src={MAILPREX_LOGO}
            alt="Mailprex"
          />
          <span className="postal-dashboard-muted">Mailprex</span>
        </div>

        <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />

        <div className="flex flex-col items-center gap-1">
          <img
            className="h-7 w-7 rounded-full border border-slate-200 object-cover dark:border-white/10"
            src={defaultAvatar.src}
            alt="Your inbox"
          />
          <span className="postal-dashboard-muted">Inbox</span>
        </div>
      </div>
    </div>
  );
};

export default LastSentCard;
