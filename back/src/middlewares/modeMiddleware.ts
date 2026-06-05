import { Request, Response, NextFunction } from "express";
import { allowSignup } from "../config/mailprexMode";

export const requireSignupAllowed = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!allowSignup()) {
    return res.status(403).json({
      message: "Registration is disabled in this Mailprex deployment.",
    });
  }
  next();
};
