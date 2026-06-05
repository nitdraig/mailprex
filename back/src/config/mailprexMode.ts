import {
  getBillingPublicConfig,
  isGumroadEnabled,
} from "./gumroad";

export type MailprexMode = "internal" | "public" | "selfhost";

const VALID_MODES: MailprexMode[] = ["internal", "public", "selfhost"];

function parseMode(): MailprexMode {
  const raw = (process.env.MAILPREX_MODE ?? "public").toLowerCase();
  if (VALID_MODES.includes(raw as MailprexMode)) {
    return raw as MailprexMode;
  }
  console.warn(
    `[mailprex] Invalid MAILPREX_MODE "${raw}", falling back to "public"`
  );
  return "public";
}

export const mailprexMode = parseMode();

export const isInternalMode = (): boolean => mailprexMode === "internal";
export const isPublicMode = (): boolean => mailprexMode === "public";
export const isSelfHostMode = (): boolean => mailprexMode === "selfhost";

export const allowSignup = (): boolean => {
  if (isInternalMode()) {
    return false;
  }
  if (isSelfHostMode()) {
    return process.env.MAILPREX_ALLOW_SIGNUP !== "false";
  }
  return true;
};

export const requiresEmailVerification = (): boolean => {
  if (isInternalMode() || isSelfHostMode()) {
    return process.env.MAILPREX_REQUIRE_EMAIL_VERIFY === "true";
  }
  return true;
};

export const getPublicConfig = () => ({
  mode: mailprexMode,
  allowSignup: allowSignup(),
  requiresEmailVerification: requiresEmailVerification(),
  billingEnabled: isGumroadEnabled(),
  billing: getBillingPublicConfig(),
});
