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
  const displayPlan = userPlan === "standard" ? "Pro" : userPlan ?? "—";

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div>
        <p className="postal-dashboard-label mb-1">Subscription</p>
        <h2 className="postal-dashboard-title mb-4">Current plan</h2>
        <div className="inline-flex items-center rounded-lg border border-primary/15 bg-primary/5 px-4 py-2 dark:border-accent/20 dark:bg-white/[0.04]">
          <span className="text-2xl font-semibold capitalize text-primary dark:text-accent">
            {displayPlan}
          </span>
        </div>
      </div>

      <div className="mt-4">
        {billingEnabled && isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleUpgrade}
            className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60 dark:bg-accent dark:text-primary dark:hover:bg-white"
          >
            {loading ? "Redirecting…" : "Upgrade to Pro"}
          </button>
        ) : null}
        {billingEnabled && !isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleManage}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            {loading ? "Redirecting…" : "Manage billing"}
          </button>
        ) : null}
        {!billingEnabled ? (
          <p className="postal-dashboard-muted">Billing coming soon</p>
        ) : null}
      </div>
    </div>
  );
};

export default UserPlanCard;
