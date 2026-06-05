import React from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import type { IconType } from "react-icons";

const FEATURES = [
  {
    icon: FaReact,
    title: "React hook",
    description:
      "Import from npm, load the basic data, and start delivering form submissions in minutes.",
    highlighted: false,
  },
  {
    icon: GrUserAdmin,
    title: "Token management",
    description:
      "Create a sending token, copy the one you have, or delete the existing one from the platform.",
    highlighted: false,
  },
  {
    icon: MdQueryStats,
    title: "Usage control",
    description:
      "Track remaining messages, renew your plan, or unsubscribe whenever you need.",
    highlighted: false,
  },
  {
    icon: IoDocumentText,
    title: "Documentation",
    description:
      "Easy access, lightweight implementation, and fast integration for any stack.",
    highlighted: true,
  },
] as const;

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  highlighted,
}: {
  icon: IconType;
  title: string;
  description: string;
  highlighted?: boolean;
}) => (
  <article
    className={`group postal-feature-card ${highlighted ? "bg-accent/30 lg:col-span-1" : ""}`}
  >
    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/15 bg-primary/5">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold uppercase tracking-[0.05em] text-secondary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-secondary/70">{description}</p>
    </div>
    <a
      href="https://docs.mailprex.excelso.xyz"
      target="_blank"
      rel="noreferrer"
      className="mt-8 flex items-center justify-between rounded-xl border border-transparent px-2 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary transition-all duration-300 group-hover:border-primary/10 group-hover:bg-primary/5"
    >
      Read more
      <span className="-translate-x-3 text-2xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <BiArrowToRight />
      </span>
    </a>
  </article>
);

const FeaturesSection = () => {
  return (
    <section className="postal-mesh-bg postal-section" id="features">
      <div aria-hidden className="postal-grid-overlay absolute inset-0 opacity-60" />

      <div className="postal-section-inner">
        <div className="mb-14 max-w-2xl">
          <p className="postal-eyebrow mb-4 text-accent/75">Main features</p>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-[0.05em] text-white lg:text-5xl">
            Quick, accessible, economical and private
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
