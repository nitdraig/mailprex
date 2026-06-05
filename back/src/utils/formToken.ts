import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import User, { IUser, UserDocument } from "../models/userModel";

export const FORM_TOKEN_PREFIX = "mk_live_";
/** Visible prefix length: `mk_live_` + first 12 secret chars */
export const FORM_TOKEN_PREFIX_LENGTH = 20;

export async function createFormTokenCredentials(): Promise<{
  rawToken: string;
  prefix: string;
  hash: string;
}> {
  const secret = randomBytes(16).toString("hex");
  const rawToken = `${FORM_TOKEN_PREFIX}${secret}`;
  const prefix = rawToken.slice(0, FORM_TOKEN_PREFIX_LENGTH);
  const hash = await bcrypt.hash(rawToken, 12);

  return { rawToken, prefix, hash };
}

export function extractFormTokenPrefix(rawToken: string): string | null {
  if (!rawToken.startsWith(FORM_TOKEN_PREFIX)) {
    return null;
  }
  if (rawToken.length < FORM_TOKEN_PREFIX_LENGTH) {
    return null;
  }
  return rawToken.slice(0, FORM_TOKEN_PREFIX_LENGTH);
}

export async function resolveUserByFormToken(
  formToken: string
): Promise<UserDocument | null> {
  if (formToken.startsWith(FORM_TOKEN_PREFIX)) {
    const prefix = extractFormTokenPrefix(formToken);
    if (!prefix) {
      return null;
    }

    const user = await User.findOne({ formTokenPrefix: prefix });
    if (!user?.formTokenHash) {
      return null;
    }

    const valid = await bcrypt.compare(formToken, user.formTokenHash);
    return valid ? user : null;
  }

  return User.findOne({ formToken });
}

export function clearUserFormToken(user: IUser): void {
  user.formToken = undefined;
  user.formTokenHash = undefined;
  user.formTokenPrefix = undefined;
}

export function userHasFormToken(user: IUser): boolean {
  return Boolean(user.formTokenHash || user.formToken);
}

export function isLegacyFormToken(user: IUser): boolean {
  return Boolean(user.formToken && !user.formTokenHash);
}

export function getFormTokenDisplayPrefix(user: IUser): string | null {
  if (user.formTokenPrefix) {
    return `${user.formTokenPrefix}…`;
  }
  if (user.formToken) {
    return `${user.formToken.slice(0, 8)}…`;
  }
  return null;
}
