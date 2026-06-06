"use client";

import {
  createCheckoutSession,
  getMailprexConfig,
  openBillingPortal,
} from "@/app/api/api";
import React, { useEffect, useState } from "react";

type UserPlanCardProps = {
  userPlan?: string;
  compact?: boolean;
};

const UserPlanCard = ({ userPlan, compact = false }: UserPlanCardProps) => {
  const [billingEnabled, setBillingEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMailprexConfig()
      .then((config) => setBillingEnabled(config.billingEnabled))
      .catch(() => setBillingEnabled(false));
  }, []);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const url = await createCheckoutSession("standard");
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    setLoading(true);
    try {
      const url = await openBillingPortal();
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isFree = userPlan?.toLowerCase() === "free";
  const displayPlan = userPlan === "standard" ? "pro" : userPlan;

  return (
    <div
      className={`flex w-full flex-col ${compact ? "items-start gap-3 lg:flex-row lg:items-center lg:justify-between" : "items-center"}`}
    >
      <div className={compact ? "min-w-0" : "text-center"}>
        <p className="postal-eyebrow-dark mb-0.5">Subscription</p>
        <h2 className={`postal-dashboard-title ${compact ? "text-base" : "mb-4 text-center"}`}>
          Your Plan
        </h2>
        <div
          className={`relative inline-flex items-center justify-center rounded-xl border border-primary/10 bg-primary/5 px-5 py-2 dark:border-accent/15 dark:bg-white/5 ${compact ? "" : "h-24 w-full max-w-xs"}`}
        >
          <span className="text-2xl font-bold uppercase tracking-[0.08em] text-primary dark:text-accent lg:text-3xl">
            {displayPlan}
          </span>
        </div>
      </div>

      <div className={`flex w-full flex-col gap-2 ${compact ? "max-w-[11rem] shrink-0" : "mt-6 max-w-xs"}`}>
        {billingEnabled && isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleUpgrade}
            className="postal-btn-primary w-full !rounded-xl !py-2 !text-xs !normal-case !tracking-normal disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Upgrade to Pro"}
          </button>
        ) : null}
        {billingEnabled && !isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleManage}
            className="w-full rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/15 disabled:opacity-60 dark:border-accent/25 dark:bg-white/10 dark:text-white"
          >
            {loading ? "Redirecting…" : "Manage billing"}
          </button>
        ) : null}
        {!billingEnabled ? (
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-primary/15 bg-primary/10 px-3 py-2 text-xs font-bold text-primary/50"
          >
            Upgrade
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserPlanCard;
