import express, { Router } from "express";
import { checkRequestLimit } from "../middlewares/requestLimitMiddleware";
import { checkRecipientRateLimit } from "../middlewares/recipientRateLimitMiddleware";
import { verifyCaptcha } from "../middlewares/verifyCaptcha";
import { sendEmail } from "../controllers";

const router: Router = express.Router();

router.post(
  "/send",
  verifyCaptcha,
  checkRequestLimit,
  checkRecipientRateLimit,
  sendEmail
);

export default router;
