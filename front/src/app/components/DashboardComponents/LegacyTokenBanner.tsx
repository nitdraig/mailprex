import React from "react";

type LegacyTokenBannerProps = {
  onRegenerate: () => void;
};

const LegacyTokenBanner: React.FC<LegacyTokenBannerProps> = ({
  onRegenerate,
}) => (
  <div
    role="alert"
    className="mb-2 flex flex-col gap-2 rounded-lg border border-amber-400/60 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-100 lg:mb-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3"
  >
    <div className="min-w-0">
      <p className="font-semibold">Legacy token detected</p>
      <p className="opacity-90 lg:line-clamp-2">
        Regenerate to migrate to secure{" "}
        <code className="font-mono">mk_live_</code> format.
      </p>
    </div>
    <button
      type="button"
      onClick={onRegenerate}
      className="shrink-0 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-700"
    >
      Regenerate
    </button>
  </div>
);

export default LegacyTokenBanner;
