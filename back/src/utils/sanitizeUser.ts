import { UserDocument } from "../models/userModel";

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
