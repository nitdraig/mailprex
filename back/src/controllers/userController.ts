import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel";
import {
  isAllowedAvatarUrl,
  normalizeAvatarUrl,
} from "../constants/avatars";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};
export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      requestCount: user.requestCount,
      lastRequest: user.lastRequest,
      photo: user.photo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user data", error });
  }
};
const ALLOWED_PROFILE_FIELDS = ["name", "lastName", "photo"] as const;

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  const authenticatedUser = req.user;

  if (!authenticatedUser || authenticatedUser._id.toString() !== userId) {
    res.status(403).json({ message: "You can only update your own profile" });
    return;
  }

  const updateData = ALLOWED_PROFILE_FIELDS.reduce<Record<string, string>>(
    (acc, field) => {
      if (typeof req.body[field] === "string" && req.body[field].trim()) {
        acc[field] = req.body[field].trim();
      }
      return acc;
    },
    {}
  );

  if (updateData.photo && !isAllowedAvatarUrl(updateData.photo)) {
    res.status(400).json({ message: "Invalid profile photo" });
    return;
  }

  if (updateData.photo) {
    updateData.photo = normalizeAvatarUrl(updateData.photo);
  }

  if (Object.keys(updateData).length === 0) {
    res.status(400).json({ message: "No valid fields to update" });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User not Found" });
      return;
    }
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      userType: updatedUser.userType,
      requestCount: updatedUser.requestCount,
      lastRequest: updatedUser.lastRequest,
      photo: updatedUser.photo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user:", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  const authenticatedUser = req.user;

  if (!authenticatedUser || authenticatedUser._id.toString() !== userId) {
    res.status(403).json({ message: "You can only delete your own account" });
    return;
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const deleteCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authenticatedUser = req.user;

  if (!authenticatedUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    await User.findByIdAndDelete(authenticatedUser._id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not Found" });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "The current password is incorrect" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password", error });
  }
};
