export type UserPlan = "free" | "standard" | "business";

export const PLAN_LIMITS: Record<UserPlan, number> = {
  free: 200,
  standard: 5000,
  business: Infinity,
};

export const PLAN_LABELS: Record<UserPlan, string> = {
  free: "Free",
  standard: "Pro",
  business: "Business",
};

export function getMonthlyLimit(userType: UserPlan): number {
  return PLAN_LIMITS[userType] ?? PLAN_LIMITS.free;
}
