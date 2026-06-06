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
    <div className="space-y-3">
      <p className="postal-dashboard-label">Plan</p>
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-semibold capitalize text-primary dark:text-accent">
          {displayPlan}
        </p>
        <div className="shrink-0">
          {billingEnabled && isFree ? (
            <button
              type="button"
              disabled={loading}
              onClick={handleUpgrade}
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-60 dark:bg-accent dark:text-primary"
            >
              Upgrade
            </button>
          ) : null}
          {billingEnabled && !isFree ? (
            <button
              type="button"
              disabled={loading}
              onClick={handleManage}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold dark:border-white/10"
            >
              Billing
            </button>
          ) : null}
          {!billingEnabled ? (
            <span className="postal-dashboard-muted text-sm">Soon</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserPlanCard;
