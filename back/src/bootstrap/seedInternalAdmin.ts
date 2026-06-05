import bcrypt from "bcrypt";
import User from "../models/userModel";
import { isInternalMode } from "../config/mailprexMode";
import { DEFAULT_AVATAR_URL } from "../constants/avatars";

export async function seedInternalAdmin(): Promise<void> {
  if (!isInternalMode()) {
    return;
  }

  const email = process.env.MAILPREX_INTERNAL_ADMIN_EMAIL;
  const password = process.env.MAILPREX_INTERNAL_ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "[mailprex] internal mode: set MAILPREX_INTERNAL_ADMIN_EMAIL and MAILPREX_INTERNAL_ADMIN_PASSWORD"
    );
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await User.create({
    name: "Admin",
    lastName: "Internal",
    email,
    password: hashedPassword,
    photo: DEFAULT_AVATAR_URL,
    verified: true,
    isSystem: true,
    userType: "business",
  });

  console.log(`[mailprex] internal mode: seeded admin user ${email}`);
}
