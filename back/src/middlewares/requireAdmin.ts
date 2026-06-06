import { Request, Response, NextFunction } from "express";
import { isAdminConfigured, isAdminEmail } from "../config/adminConfig";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!isAdminConfigured()) {
    res.status(503).json({ message: "Admin panel is not configured" });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  if (!isAdminEmail(req.user.email)) {
    res.status(403).json({ message: "Admin access required" });
    return;
  }

  next();
};
