import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

const limits = {
  free: 200,
  standard: 2000,
  business: Infinity,
};

export const checkRequestLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { formToken } = req.body;
  if (!formToken) {
    return res.status(400).json({ message: "Form token is required" });
  }

  try {
    const user = await User.findOne({ formToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid form token" });
    }

    const currentDate = new Date();
    const lastRequestDate = new Date(user.lastRequest);

    const isNewMonth =
      currentDate.getFullYear() !== lastRequestDate.getFullYear() ||
      currentDate.getMonth() !== lastRequestDate.getMonth();

    if (isNewMonth) {
      user.requestCount = 0;
    }

    const userLimit = limits[user.userType];

    if (user.requestCount >= userLimit) {
      return res.status(429).json({
        message: `Request limit reached for the current month:${userLimit}`,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error checking request limit", error });
  }
};
