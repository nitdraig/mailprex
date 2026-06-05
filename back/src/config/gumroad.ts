export type GumroadPlan = "standard" | "business";

function productIdForPlan(plan: GumroadPlan): string | undefined {
  return plan === "business"
    ? process.env.GUMROAD_PRODUCT_ID_BUSINESS
    : process.env.GUMROAD_PRODUCT_ID_PRO;
}

function urlForPlan(plan: GumroadPlan): string | undefined {
  return plan === "business"
    ? process.env.GUMROAD_URL_BUSINESS
    : process.env.GUMROAD_URL_PRO;
}

export const isGumroadEnabled = (): boolean =>
  Boolean(
    process.env.GUMROAD_SELLER_ID &&
      process.env.GUMROAD_URL_PRO &&
      process.env.GUMROAD_PRODUCT_ID_PRO
  );

export function getGumroadLibraryUrl(): string {
  return process.env.GUMROAD_LIBRARY_URL ?? "https://gumroad.com/library";
}

export function buildGumroadCheckoutUrl(
  plan: GumroadPlan,
  email: string
): string | null {
  const baseUrl = urlForPlan(plan);
  if (!baseUrl) {
    return null;
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("email", email);
    return url.toString();
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}email=${encodeURIComponent(email)}`;
  }
}

export function planForProductId(productId: string): GumroadPlan | null {
  if (productId === process.env.GUMROAD_PRODUCT_ID_BUSINESS) {
    return "business";
  }
  if (productId === process.env.GUMROAD_PRODUCT_ID_PRO) {
    return "standard";
  }
  return null;
}

export function getBillingPublicConfig() {
  if (!isGumroadEnabled()) {
    return null;
  }

  return {
    provider: "gumroad" as const,
    proUrl: process.env.GUMROAD_URL_PRO,
    businessUrl: process.env.GUMROAD_URL_BUSINESS,
    libraryUrl: getGumroadLibraryUrl(),
  };
}

export function verifyGumroadSeller(sellerId: string | undefined): boolean {
  const expected = process.env.GUMROAD_SELLER_ID;
  if (!expected || !sellerId) {
    return false;
  }
  return sellerId === expected;
}

export { productIdForPlan, urlForPlan };
