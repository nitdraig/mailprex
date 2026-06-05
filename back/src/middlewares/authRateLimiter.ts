import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    message: "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
