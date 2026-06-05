import SVGCheck from "@/app/components/IndexComponents/SVGCheck";
import SVGArrowCheck from "@/app/components/IndexComponents/SVGArrowCheck";
import Link from "next/link";
import React from "react";

const FEATURES = [
  "200 sends per month",
  "Private token",
  "Control your remaining shipments",
] as const;

const FreeCard = () => {
  return (
    <article className="postal-price-card lg:rounded-r-none lg:border-r-0">
      <div aria-hidden className="postal-route-line" />
      <div className="mb-5 border-b border-primary/10 pb-4 text-left">
        <p className="postal-price-tier">Start</p>
        <h3 className="text-5xl font-bold text-secondary">Free</h3>
      </div>

      <div className="mb-8 flex-1 text-left">
        {FEATURES.map((feature) => (
          <div key={feature} className="postal-check-item">
            <SVGCheck />
            {feature}
          </div>
        ))}
      </div>

      <Link
        href="/register"
        className="postal-btn-primary w-full justify-between !rounded-xl !normal-case !tracking-normal"
      >
        Get Free
        <SVGArrowCheck />
      </Link>
    </article>
  );
};

export default FreeCard;
