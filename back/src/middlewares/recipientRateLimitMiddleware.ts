import { Request, Response, NextFunction } from "express";
import Send from "../models/sendModel";

const DEFAULT_RECIPIENT_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;

const recipientLimit = parseInt(
  process.env.RECIPIENT_RATE_LIMIT_PER_HOUR ?? String(DEFAULT_RECIPIENT_LIMIT),
  10
);

export const checkRecipientRateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const emailDestiny = req.body.emailDestiny as string | undefined;

  if (!user || !emailDestiny) {
    next();
    return;
  }

  try {
    const since = new Date(Date.now() - WINDOW_MS);
    const count = await Send.countDocuments({
      userId: user._id,
      to: emailDestiny.toLowerCase(),
      status: "sent",
      createdAt: { $gte: since },
    });

    if (count >= recipientLimit) {
      return res.status(429).json({
        message:
          "Too many emails to this recipient in the last hour. Please try again later.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error checking recipient rate limit",
      error,
    });
  }
};
