import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { UserDocument } from "../models/userModel";
import { getAuthTokenFromRequest } from "../utils/getAuthToken";
import { isAccessTokenRevoked } from "../utils/jwtAuth";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface DecodedToken {
  userId: string;
  email: string;
  jti?: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getAuthTokenFromRequest(req);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    if (decoded.jti && (await isAccessTokenRevoked(decoded.jti))) {
      return res.status(401).json({ message: "Token revoked" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
