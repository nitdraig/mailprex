import { Response } from "express";
import { CustomRequest } from "../types/CustomRequest";
import User from "../models/userModel";
import { isPublicMode } from "../config/mailprexMode";
import {
  buildGumroadCheckoutUrl,
  getGumroadLibraryUrl,
  isGumroadEnabled,
  planForProductId,
  verifyGumroadSeller,
} from "../config/gumroad";

type GumroadPingBody = {
  seller_id?: string;
  product_id?: string;
  email?: string;
  sale_id?: string;
  subscription_id?: string;
  refunded?: string;
  cancelled?: string;
  resource_name?: string;
};

async function findUserByEmail(email: string) {
  const escaped = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return User.findOne({ email: { $regex: `^${escaped}$`, $options: "i" } });
}

async function applyPlanByEmail(
  email: string,
  productId: string,
  saleId?: string,
  subscriptionId?: string
): Promise<void> {
  const plan = planForProductId(productId);
  if (!plan) {
    return;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    console.warn(`[gumroad] No Mailprex user for purchase email: ${email}`);
    return;
  }

  user.userType = plan === "business" ? "business" : "standard";
  user.subscriptionStatus = "active";
  if (saleId) {
    user.gumroadSaleId = saleId;
  }
  if (subscriptionId) {
    user.gumroadSubscriptionId = subscriptionId;
  }

  await user.save();
  console.log(`[gumroad] Upgraded ${email} to ${user.userType}`);
}

async function downgradeByEmail(email: string): Promise<void> {
  const user = await findUserByEmail(email);
  if (!user) {
    return;
  }

  user.userType = "free";
  user.subscriptionStatus = "canceled";
  user.gumroadSaleId = undefined;
  user.gumroadSubscriptionId = undefined;
  await user.save();
  console.log(`[gumroad] Downgraded ${email} to free`);
}

export const createCheckoutSession = async (
  req: CustomRequest,
  res: Response
) => {
  if (!isPublicMode() || !isGumroadEnabled()) {
    return res.status(503).json({ message: "Billing is not available" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const plan = (req.body.plan as string) === "business" ? "business" : "standard";
  const url = buildGumroadCheckoutUrl(plan, req.user.email);

  if (!url) {
    return res.status(400).json({ message: "Invalid plan" });
  }

  return res.status(200).json({ url });
};

export const getBillingPortal = (_req: CustomRequest, res: Response) => {
  if (!isPublicMode() || !isGumroadEnabled()) {
    return res.status(503).json({ message: "Billing is not available" });
  }

  return res.status(200).json({ url: getGumroadLibraryUrl() });
};

export const gumroadPing = async (req: CustomRequest, res: Response) => {
  if (!isGumroadEnabled()) {
    return res.status(503).json({ message: "Gumroad billing not configured" });
  }

  const body = req.body as GumroadPingBody;

  if (!verifyGumroadSeller(body.seller_id)) {
    console.warn("[gumroad] Rejected ping with invalid seller_id");
    return res.status(403).json({ message: "Invalid seller" });
  }

  const email = body.email?.trim();
  const productId = body.product_id?.trim();

  if (!email || !productId) {
    return res.status(400).json({ message: "Missing email or product_id" });
  }

  const isRefund = body.refunded === "true";
  const isCancelled =
    body.cancelled === "true" || body.resource_name === "cancellation";

  try {
    if (isRefund || isCancelled) {
      await downgradeByEmail(email);
    } else {
      await applyPlanByEmail(
        email,
        productId,
        body.sale_id,
        body.subscription_id
      );
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("[gumroad] Ping handler error:", error);
    return res.status(500).json({ message: "Webhook handler failed" });
  }
};
