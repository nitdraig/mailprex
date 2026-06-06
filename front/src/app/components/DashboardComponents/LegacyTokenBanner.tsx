import React from "react";

type LegacyTokenBannerProps = {
  onRegenerate: () => void;
};

const LegacyTokenBanner: React.FC<LegacyTokenBannerProps> = ({
  onRegenerate,
}) => (
  <div
    role="alert"
    className="mb-1.5 flex items-center justify-between gap-2 rounded border border-amber-400/40 bg-amber-50 px-2 py-1 text-[10px] text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
  >
    <span className="min-w-0 truncate">
      Legacy token — regenerate for <code className="font-mono">mk_live_</code>
    </span>
    <button
      type="button"
      onClick={onRegenerate}
      className="shrink-0 rounded bg-amber-600 px-2 py-0.5 text-[10px] font-semibold text-white"
    >
      Fix
    </button>
  </div>
);

export default LegacyTokenBanner;
