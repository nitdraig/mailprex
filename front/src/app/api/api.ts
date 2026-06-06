import { authFetch } from "./fetchAuth";

export type FormTokenStatus = {
  hasToken: boolean;
  prefix?: string;
  legacy?: boolean;
};

export type GenerateFormTokenResult = {
  formToken: string;
  prefix: string;
};

export const getFormToken = async (): Promise<FormTokenStatus> => {
  const response = await authFetch("/token/getFormToken", { method: "GET" });
  const data = await response.json();

  if (response.ok) {
    return data as FormTokenStatus;
  }

  throw new Error(data.message ?? "Failed to fetch form token");
};

export const generateFormToken = async (
  email: string,
): Promise<GenerateFormTokenResult> => {
  const response = await authFetch("/token/generateToken", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  if (response.ok) {
    return data as GenerateFormTokenResult;
  }

  throw new Error(data.message ?? "Failed to generate form token");
};

export const deleteFormToken = async (email: string) => {
  const response = await authFetch("/token/deleteToken", {
    method: "DELETE",
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to delete form token");
  }
};

export type MailprexBillingConfig = {
  provider: "gumroad";
  proUrl?: string;
  businessUrl?: string;
  libraryUrl: string;
};

export type MailprexPublicConfig = {
  mode: string;
  allowSignup: boolean;
  requiresEmailVerification: boolean;
  billingEnabled: boolean;
  billing: MailprexBillingConfig | null;
  googleAuthEnabled?: boolean;
};

export const getMailprexConfig = async (): Promise<MailprexPublicConfig> => {
  const response = await authFetch("/auth/config", { method: "GET" });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch config");
  }

  return data as MailprexPublicConfig;
};

export const createCheckoutSession = async (plan: "standard" | "business") => {
  const response = await authFetch("/billing/checkout", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to start checkout");
  }

  return data.url as string;
};

export const openBillingPortal = async () => {
  const response = await authFetch("/billing/portal", { method: "GET" });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to open billing portal");
  }

  return data.url as string;
};
