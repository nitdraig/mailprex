import { CookieOptions, Response } from "express";

export const AUTH_COOKIE_NAME = "mailprex_token";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const isProduction = process.env.NODE_ENV === "production";

export const getAuthCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "lax" : "lax",
  maxAge: THIRTY_DAYS_MS,
  path: "/",
});

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  });
};
