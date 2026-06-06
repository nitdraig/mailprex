import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/userModel";
import { pickDefaultAvatarUrl } from "../constants/avatars";
import { setAuthCookie } from "../utils/authCookie";
import { sanitizeSessionUser } from "../utils/sanitizeUser";
import { signAccessToken } from "../utils/jwtAuth";
import {
  isGoogleAuthEnabled,
  verifyGoogleIdToken,
} from "../utils/googleAuth";
import { allowSignup } from "../config/mailprexMode";

export const loginWithGoogle = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!isGoogleAuthEnabled()) {
    res.status(503).json({ message: "Google sign-in is not configured" });
    return;
  }

  const credential =
    typeof req.body?.credential === "string" ? req.body.credential.trim() : "";

  if (!credential) {
    res.status(400).json({ message: "Google credential is required" });
    return;
  }

  try {
    const profile = await verifyGoogleIdToken(credential);

    let user =
      (await User.findOne({ email: profile.email })) ??
      (await User.findOne({ googleId: profile.googleId }));

    if (user) {
      if (!user.googleId) {
        user.googleId = profile.googleId;
      }

      if (!user.verified && profile.emailVerified) {
        user.verified = true;
      }

      await user.save();
    } else {
      if (!allowSignup()) {
        res.status(403).json({
          message: "Registration is disabled in this Mailprex deployment.",
        });
        return;
      }

      const randomPassword = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 12);

      user = new User({
        name: profile.givenName,
        lastName: profile.familyName,
        email: profile.email,
        password: hashedPassword,
        googleId: profile.googleId,
        photo: pickDefaultAvatarUrl(),
        verified: true,
      });

      await user.save();
    }

    const token = signAccessToken(String(user._id), user.email);
    setAuthCookie(res, token);

    res.status(200).json({
      message: "Successful login",
      user: sanitizeSessionUser(user),
    });
  } catch (error) {
    console.error("Google sign-in failed:", error);
    res.status(401).json({ message: "Google sign-in failed" });
  }
};
