import { Request } from "express";
import { AUTH_COOKIE_NAME } from "./authCookie";

export const getAuthTokenFromRequest = (req: Request): string | undefined => {
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  if (typeof cookieToken === "string" && cookieToken.length > 0) {
    return cookieToken;
  }

  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    const bearerToken = header.slice(7).trim();
    if (bearerToken.length > 0) {
      return bearerToken;
    }
  }

  return undefined;
};
