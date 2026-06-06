import { UserDocument } from "../models/userModel";
import { isAdminEmail } from "../config/adminConfig";

export type PublicUser = {
  _id: unknown;
  name: string;
  lastName: string;
  email: string;
  photo?: string;
  userType: string;
  requestCount: number;
  lastRequest: Date;
  verified: boolean;
};

export type SessionUser = PublicUser & {
  isAdmin: boolean;
};

export type AdminUser = PublicUser & {
  createdAt?: Date;
  updatedAt?: Date;
  subscriptionStatus?: string;
  hasGoogleId?: boolean;
};

export const sanitizeUser = (user: UserDocument): PublicUser => ({
  _id: user._id,
  name: user.name,
  lastName: user.lastName,
  email: user.email,
  photo: user.photo,
  userType: user.userType,
  requestCount: user.requestCount,
  lastRequest: user.lastRequest,
  verified: user.verified,
});

export const sanitizeSessionUser = (user: UserDocument): SessionUser => ({
  ...sanitizeUser(user),
  isAdmin: isAdminEmail(user.email),
});

export const sanitizeAdminUser = (user: UserDocument): AdminUser => ({
  ...sanitizeUser(user),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  subscriptionStatus: user.subscriptionStatus,
  hasGoogleId: Boolean(user.googleId),
});
