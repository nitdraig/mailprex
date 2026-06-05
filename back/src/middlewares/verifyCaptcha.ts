import { NextFunction, Request, Response } from "express";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const verifyCaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    next();
    return;
  }

  const captchaToken =
    typeof req.body?.captchaToken === "string"
      ? req.body.captchaToken
      : typeof req.body?.["cf-turnstile-response"] === "string"
        ? req.body["cf-turnstile-response"]
        : "";

  if (!captchaToken) {
    res.status(400).json({ message: "CAPTCHA verification is required" });
    return;
  }

  try {
    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: captchaToken,
        remoteip: req.ip ?? "",
      }),
    });

    const result = (await verifyResponse.json()) as { success?: boolean };

    if (!result.success) {
      res.status(400).json({ message: "CAPTCHA verification failed" });
      return;
    }

    next();
  } catch {
    res.status(503).json({ message: "CAPTCHA verification unavailable" });
  }
};
