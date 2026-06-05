import React from "react";
import defaultAvatar from "@/app/assets/defaultAvatar.svg";

const MAILPREX_LOGO = "https://mailprex.excelso.xyz/logo.webp";

const LastSentCard = ({ lastEmailDate }: { lastEmailDate: string }) => {
  return (
    <div className="grid h-full gap-6 sm:grid-cols-2">
      <div className="flex flex-col justify-center">
        <p className="postal-eyebrow-dark mb-2">Activity</p>
        <h2 className="postal-dashboard-title mb-2">Last delivery</h2>
        <p className="postal-dashboard-stat text-lg font-semibold text-primary dark:text-accent">
          {lastEmailDate || "No sends yet"}
        </p>
      </div>

      <div className="relative flex flex-col justify-center gap-5 border-t border-primary/10 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 dark:border-accent/15">
        <div className="flex items-center justify-end gap-2">
          <span className="rounded-lg border border-primary/15 bg-white/70 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary dark:border-accent/20 dark:bg-white/5 dark:text-accent">
            Your Web
          </span>
          <img
            className="h-8 w-8 rounded-full border border-primary/15 object-cover dark:border-accent/20"
            src={defaultAvatar.src}
            alt="Your website"
          />
        </div>

        <div className="flex items-center gap-2 sm:justify-center">
          <img
            className="h-9 w-9 rounded-full border border-primary/15 object-cover dark:border-accent/20"
            src={MAILPREX_LOGO}
            alt="Mailprex"
          />
          <span className="rounded-lg border border-primary/15 bg-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:border-accent/20 dark:bg-white/10 dark:text-accent">
            Mailprex
          </span>
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="rounded-lg border border-primary/15 bg-white/70 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary dark:border-accent/20 dark:bg-white/5 dark:text-accent">
            Your email
          </span>
          <img
            className="h-8 w-8 rounded-full border border-primary/15 object-cover dark:border-accent/20"
            src={defaultAvatar.src}
            alt="Your email inbox"
          />
        </div>
      </div>
    </div>
  );
};

export default LastSentCard;
