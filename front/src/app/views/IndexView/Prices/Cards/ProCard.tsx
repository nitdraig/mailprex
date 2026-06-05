"use client";

import SVGArrowCheck from "@/app/components/IndexComponents/SVGArrowCheck";
import SVGCheck from "@/app/components/IndexComponents/SVGCheck";
import { getMailprexConfig } from "@/app/api/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FEATURES = [
  "5,000 sends per month",
  "Hashed API keys (mk_live_…)",
  "Send log and analytics",
  "Priority support",
  "Custom SMTP (coming soon)",
] as const;

const ProCard = () => {
  const [billingEnabled, setBillingEnabled] = useState(false);

  useEffect(() => {
    getMailprexConfig()
      .then((config) => setBillingEnabled(config.billingEnabled))
      .catch(() => setBillingEnabled(false));
  }, []);

  return (
    <article className="postal-price-card postal-price-card-featured my-2 lg:my-0">
      <div aria-hidden className="postal-route-line" />
      <span className="absolute right-4 top-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
        Popular
      </span>

      <div className="mb-5 border-b border-primary/10 pb-4 text-left">
        <p className="postal-price-tier">Pro</p>
        <h3 className="text-5xl font-bold text-secondary">
          {billingEnabled ? "$5/mo" : "Soon"}
        </h3>
      </div>

      <div className="mb-8 flex-1 text-left">
        {FEATURES.map((feature) => (
          <div key={feature} className="postal-check-item">
            <SVGCheck />
            {feature}
          </div>
        ))}
      </div>

      {billingEnabled ? (
        <Link
          href="/dashboard"
          className="flex w-full items-center justify-between rounded-xl border border-primary bg-primary px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          Upgrade in dashboard
          <SVGArrowCheck />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-primary/20 bg-primary/20 px-6 py-3 text-sm font-bold text-primary/60"
        >
          Get Pro
          <SVGArrowCheck />
        </button>
      )}
    </article>
  );
};

export default ProCard;
