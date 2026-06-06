import React from "react";
import defaultAvatar from "@/app/assets/defaultAvatar.svg";

const MAILPREX_LOGO = "https://mailprex.excelso.xyz/logo.webp";

type LastSentCardProps = {
  lastEmailDate: string;
  compact?: boolean;
};

const LastSentCard = ({ lastEmailDate }: LastSentCardProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="postal-dashboard-label">Last delivery</p>
        <p className="text-base font-medium text-primary dark:text-accent">
          {lastEmailDate || "—"}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-white/[0.04]">
        <div className="flex flex-col items-center gap-1">
          <img
            className="h-7 w-7 rounded-full border border-slate-200 object-cover dark:border-white/10"
            src={defaultAvatar.src}
            alt="Web"
          />
          <span className="text-[10px] text-slate-500">Web</span>
        </div>
        <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />
        <div className="flex flex-col items-center gap-1">
          <img
            className="h-8 w-8 rounded-full border border-slate-200 object-cover dark:border-white/10"
            src={MAILPREX_LOGO}
            alt="Mailprex"
          />
          <span className="text-[10px] text-slate-500">Mailprex</span>
        </div>
        <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />
        <div className="flex flex-col items-center gap-1">
          <img
            className="h-7 w-7 rounded-full border border-slate-200 object-cover dark:border-white/10"
            src={defaultAvatar.src}
            alt="Inbox"
          />
          <span className="text-[10px] text-slate-500">Inbox</span>
        </div>
      </div>
    </div>
  );
};

export default LastSentCard;
