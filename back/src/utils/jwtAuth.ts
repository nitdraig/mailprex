import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import RevokedToken from "../models/revokedTokenModel";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AccessTokenPayload {
  userId: string;
  email: string;
  jti: string;
}

export function signAccessToken(userId: string, email: string): string {
  const jti = randomUUID();
  return jwt.sign({ userId, email, jti }, JWT_SECRET, { expiresIn: "30d" });
}

export async function revokeAccessToken(token: string): Promise<void> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AccessTokenPayload & {
      exp?: number;
    };

    if (!decoded.jti || !decoded.exp) {
      return;
    }

    await RevokedToken.updateOne(
      { jti: decoded.jti },
      { jti: decoded.jti, expiresAt: new Date(decoded.exp * 1000) },
      { upsert: true }
    );
  } catch {
    // Ignore invalid or expired tokens on logout
  }
}

export async function isAccessTokenRevoked(jti: string): Promise<boolean> {
  const revoked = await RevokedToken.exists({ jti });
  return Boolean(revoked);
}
