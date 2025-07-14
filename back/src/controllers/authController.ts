import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import dotenv from "dotenv";
import { transporter } from "../config/transporterConfig";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      photo:
        "https://res.cloudinary.com/draig/image/upload/v1718494479/mailprex/avatars/fct0oivmlfvcmhsov2au.jpg",
      formToken: uuidv4(),
    });
    await newUser.save();

    const verificationToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const verificationLink = `https://mailprex.excelso.xyz/verify?token=${verificationToken}`;
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
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    console.log("Login request received for:", email);

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

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token, message: "Successful login" });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error });
  }
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
  } catch (error) {
    res.status(400).json({ message: "Invalid verification token", error });
  }
};
