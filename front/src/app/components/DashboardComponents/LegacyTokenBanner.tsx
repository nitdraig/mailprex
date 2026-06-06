import React from "react";

type LegacyTokenBannerProps = {
  onRegenerate: () => void;
};

const LegacyTokenBanner: React.FC<LegacyTokenBannerProps> = ({
  onRegenerate,
}) => (
  <div
    role="alert"
    className="mb-3 flex flex-col gap-2 rounded-lg border border-amber-400/40 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100 sm:flex-row sm:items-center sm:justify-between"
  >
    <p className="min-w-0">
      <span className="font-semibold">Legacy token.</span> Regenerate to migrate
      to <code className="font-mono">mk_live_</code> format.
    </p>
    <button
      type="button"
      onClick={onRegenerate}
      className="shrink-0 rounded-md bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-700"
    >
      Regenerate
    </button>
  </div>
);

export default LegacyTokenBanner;
