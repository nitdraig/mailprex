import SVGArrowCheck from "@/app/components/IndexComponents/SVGArrowCheck";
import SVGCheck from "@/app/components/IndexComponents/SVGCheck";
import React from "react";

const FEATURES = [
  "Ilimited sends",
  "PRO plan benefits",
  "Personalized attention",
] as const;

const BusinessCard = () => {
  return (
    <article className="postal-price-card lg:rounded-l-none lg:border-l-0">
      <div aria-hidden className="postal-route-line" />

      <div className="mb-5 border-b border-primary/10 pb-4 text-left">
        <p className="postal-price-tier">Business</p>
        <h3 className="text-5xl font-bold text-secondary">Coming Soon</h3>
      </div>

      <div className="mb-8 flex-1 text-left">
        {FEATURES.map((feature) => (
          <div key={feature} className="postal-check-item">
            <SVGCheck />
            {feature}
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-secondary/20 bg-secondary/10 px-6 py-3 text-sm font-bold text-secondary/50"
      >
        Get Business
        <SVGArrowCheck />
      </button>
    </article>
  );
};

export default BusinessCard;
