import React from "react";
import defaultAvatar from "@/app/assets/defaultAvatar.svg";

const MAILPREX_LOGO = "https://mailprex.excelso.xyz/logo.webp";

type LastSentCardProps = {
  lastEmailDate: string;
  compact?: boolean;
};

const LastSentCard = ({ lastEmailDate, compact = false }: LastSentCardProps) => {
  return (
    <div
      className={`grid h-full w-full gap-4 ${compact ? "lg:grid-cols-[1fr_auto] lg:items-center lg:gap-3" : "sm:grid-cols-2"}`}
    >
      <div className="flex flex-col justify-center">
        <p className="postal-eyebrow-dark mb-0.5">Activity</p>
        <h2 className={`postal-dashboard-title ${compact ? "text-base" : "mb-2"}`}>
          Last delivery
        </h2>
        <p
          className={`font-semibold text-primary dark:text-accent ${compact ? "text-sm" : "text-lg"}`}
        >
          {lastEmailDate || "No sends yet"}
        </p>
      </div>

      <div
        className={`relative flex flex-col justify-center gap-3 ${compact ? "min-w-[9.5rem] border-l border-primary/10 pl-3 dark:border-accent/15" : "gap-5 border-t border-primary/10 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 dark:border-accent/15"}`}
      >
        <div className="flex items-center justify-end gap-2">
          <span className="rounded-md border border-primary/15 bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary dark:border-accent/20 dark:bg-white/5 dark:text-accent">
            Web
          </span>
          <img
            className="h-6 w-6 rounded-full border border-primary/15 object-cover dark:border-accent/20"
            src={defaultAvatar.src}
            alt="Your website"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <img
            className="h-7 w-7 rounded-full border border-primary/15 object-cover dark:border-accent/20"
            src={MAILPREX_LOGO}
            alt="Mailprex"
          />
          <span className="rounded-md border border-primary/15 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary dark:border-accent/20 dark:bg-white/10 dark:text-accent">
            Mailprex
          </span>
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="rounded-md border border-primary/15 bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary dark:border-accent/20 dark:bg-white/5 dark:text-accent">
            Inbox
          </span>
          <img
            className="h-6 w-6 rounded-full border border-primary/15 object-cover dark:border-accent/20"
            src={defaultAvatar.src}
            alt="Your email inbox"
          />
        </div>
      </div>
    </div>
  );
};

export default LastSentCard;
