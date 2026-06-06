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
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-baseline gap-2">
        <p className="postal-dashboard-label shrink-0">Plan</p>
        <p className="truncate text-sm font-semibold capitalize text-primary dark:text-accent">
          {displayPlan}
        </p>
      </div>
      <div className="shrink-0">
        {billingEnabled && isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleUpgrade}
            className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-white disabled:opacity-60 dark:bg-accent dark:text-primary"
          >
            Upgrade
          </button>
        ) : null}
        {billingEnabled && !isFree ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleManage}
            className="rounded-md border border-slate-200 px-2.5 py-1 text-[11px] font-semibold dark:border-white/10"
          >
            Billing
          </button>
        ) : null}
        {!billingEnabled ? (
          <span className="postal-dashboard-muted">Soon</span>
        ) : null}
      </div>
    </div>
  );
};

export default UserPlanCard;
