import React from "react";

type LegacyTokenBannerProps = {
  onRegenerate: () => void;
};

const LegacyTokenBanner: React.FC<LegacyTokenBannerProps> = ({
  onRegenerate,
}) => (
  <div
    role="alert"
    className="mb-4 rounded-lg border border-amber-400/60 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-900 dark:text-amber-100"
  >
    <p className="font-semibold mb-1">Legacy token detected</p>
    <p className="mb-3 opacity-90">
      Your form token uses the old UUID format stored in plain text. Regenerate
      now to migrate to the secure <code className="font-mono">mk_live_</code>{" "}
      format. Update the token in every site or env var that uses Mailprex.
    </p>
    <button
      type="button"
      onClick={onRegenerate}
      className="rounded-md bg-amber-600 px-3 py-1.5 text-white font-medium hover:bg-amber-700 transition-colors"
    >
      Regenerate secure token
    </button>
  </div>
);

export default LegacyTokenBanner;
