import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/userModel";
import dotenv from "dotenv";
import { transporter } from "../config/transporterConfig";
import { DEFAULT_AVATAR_URL } from "../constants/avatars";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookie";
import { sanitizeUser } from "../utils/sanitizeUser";
import { revokeAccessToken, signAccessToken } from "../utils/jwtAuth";
import { getAuthTokenFromRequest } from "../utils/getAuthToken";
import { getPublicConfig, requiresEmailVerification } from "../config/mailprexMode";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const FRONTEND_URL =
  process.env.FRONTEND_URL?.replace(/\/$/, "") ??
  "https://mailprex.excelso.xyz";

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
      verified: !requiresEmailVerification(),
      photo: DEFAULT_AVATAR_URL,
    });
    await newUser.save();

    if (!requiresEmailVerification()) {
      res.status(201).json({
        message: "Registered user successfully.",
      });
      return;
    }

    const verificationToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const verificationLink = `${FRONTEND_URL}/verify?token=${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAILSEND!,
      to: email,
      subject: "Account Verification",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #2b4c7e;">Welcome to Mailprex!</h2>
      <p style="font-size: 16px; color: #555;">
        You're one step away from activating your account. Please click the button below to verify your email address:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${verificationLink}" style="background-color: #2b4c7e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Verify my account
        </a>
      </div>
      <p style="font-size: 14px; color: #1f1f20;">
        If you can't click the button, copy and paste the following link into your browser:
      </p>
      <p style="font-size: 14px; color: #2b4c7e; word-wrap: break-word;">
        <a href="${verificationLink}" style="color: #2b4c7e;">${verificationLink}</a>
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #1f1f20;">
        If you didn't request this verification, you can ignore this email.
      </p>
      <p style="font-size: 12px; color: #1f1f20;">
        Thanks,<br>
        The Mailprex Team
      </p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Registered user successfully. Please verify your account.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.verified) {
      res.status(400).json({
        message:
          "Incorrect credentials. Please check your email and password or verify your email (check spam).",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        message:
          "Incorrect credentials. Please check your email and password or verify your email (check spam).",
      });
      return;
    }

    const token = signAccessToken(String(user._id), user.email);

    setAuthCookie(res, token);

    res.status(200).json({
      message: "Successful login",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = getAuthTokenFromRequest(req);
  if (token) {
    await revokeAccessToken(token);
  }

  clearAuthCookie(res);
  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  res.status(200).json(sanitizeUser(req.user));
};

export const getConfig = (_req: Request, res: Response): void => {
  res.status(200).json(getPublicConfig());
};

export const verifyAccount = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Verification token not provided" });
  }

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ message: "The account is already verified" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Successfully verified account" });
  } catch {
    res.status(400).json({ message: "Invalid or expired verification token" });
  }
};
