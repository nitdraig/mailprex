import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  createCheckoutSession,
  getBillingPortal,
} from "../controllers/billingController";

const router = Router();

router.post("/checkout", authenticateToken, createCheckoutSession);
router.get("/portal", authenticateToken, getBillingPortal);

export default router;
