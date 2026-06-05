"use client";

import {
  createCheckoutSession,
  getMailprexConfig,
  openBillingPortal,
} from "@/app/api/api";
import React, { useEffect, useState } from "react";

type UserPlanCardProps = {
  userPlan?: string;
};

const UserPlanCard = ({ userPlan }: UserPlanCardProps) => {
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
    <div className="m-auto flex w-full flex-col items-center">
      <p className="postal-eyebrow-dark mb-2">Subscription</p>
      <h2 className="postal-dashboard-title mb-4 text-center">Your Plan</h2>

      <div className="relative flex h-24 w-full max-w-xs items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl border border-primary/10 bg-primary/5 dark:border-accent/15 dark:bg-white/5"
        />
        <span className="relative text-4xl font-bold uppercase tracking-[0.08em] text-primary dark:text-accent">
          {displayPlan}
        </span>
      </div>

      <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
        {billingEnabled && isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleUpgrade}
            className="postal-btn-primary w-full !rounded-xl !normal-case !tracking-normal disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Upgrade to Pro"}
          </button>
        ) : null}
        {billingEnabled && !isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleManage}
            className="w-full rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/15 disabled:opacity-60 dark:border-accent/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          >
            {loading ? "Redirecting…" : "Manage billing"}
          </button>
        ) : null}
        {!billingEnabled ? (
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-primary/15 bg-primary/10 px-4 py-3 text-sm font-bold text-primary/50"
          >
            Upgrade
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserPlanCard;
