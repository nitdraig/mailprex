import React from "react";
import FreeCard from "./Cards/FreeCard";
import ProCard from "./Cards/ProCard";
import BusinessCard from "./Cards/BusinessCard";

const PricesSection = () => {
  return (
    <section className="postal-section bg-gradient-to-br from-accent via-accent/95 to-accent/85" id="pricing">
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="postal-section-inner text-center">
        <p className="postal-eyebrow mb-4 text-primary/60">Plans</p>
        <h2 className="mb-4 text-3xl font-bold uppercase tracking-[0.06em] text-primary lg:text-4xl">
          Prices
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-secondary/70">
          Start for free and scale when your delivery volume grows.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch lg:gap-0">
          <FreeCard />
          <ProCard />
          <BusinessCard />
        </div>
      </div>
    </section>
  );
};

export default PricesSection;
