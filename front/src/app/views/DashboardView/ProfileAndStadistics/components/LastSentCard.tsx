import React from "react";
import defaultAvatar from "@/app/assets/defaultAvatar.svg";

const MAILPREX_LOGO = "https://mailprex.excelso.xyz/logo.webp";

type LastSentCardProps = {
  lastEmailDate: string;
  compact?: boolean;
};

const LastSentCard = ({ lastEmailDate }: LastSentCardProps) => {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <p className="postal-dashboard-label">Last delivery</p>
        <p className="text-xs font-medium text-primary dark:text-accent">
          {lastEmailDate || "—"}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <img
          className="h-4 w-4 rounded-full border border-slate-200 object-cover dark:border-white/10"
          src={defaultAvatar.src}
          alt="Web"
        />
        <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />
        <img
          className="h-5 w-5 rounded-full border border-slate-200 object-cover dark:border-white/10"
          src={MAILPREX_LOGO}
          alt="Mailprex"
        />
        <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />
        <img
          className="h-4 w-4 rounded-full border border-slate-200 object-cover dark:border-white/10"
          src={defaultAvatar.src}
          alt="Inbox"
        />
      </div>
    </div>
  );
};

export default LastSentCard;
