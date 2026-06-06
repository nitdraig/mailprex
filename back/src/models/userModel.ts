import mongoose, { HydratedDocument, Schema } from "mongoose";

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
  googleId?: string;
  formToken?: string;
  formTokenHash?: string;
  formTokenPrefix?: string;
  userType: "free" | "standard" | "business";
  requestCount: number;
  lastRequest: Date;
  verified: boolean;
  isSystem?: boolean;
  gumroadSaleId?: string;
  gumroadSubscriptionId?: string;
  subscriptionStatus?: "active" | "past_due" | "canceled" | "none";
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: false },
  password: { type: String, required: true },
  googleId: { type: String, required: false, unique: true, sparse: true },
  formToken: { type: String, required: false },
  formTokenHash: { type: String, required: false },
  formTokenPrefix: { type: String, required: false },
  userType: {
    type: String,
    enum: ["free", "standard", "business"],
    default: "free",
  },
  requestCount: { type: Number, default: 0 },
  lastRequest: { type: Date, default: new Date() },
  verified: { type: Boolean, default: false },
  isSystem: { type: Boolean, default: false },
  gumroadSaleId: { type: String, required: false },
  gumroadSubscriptionId: { type: String, required: false },
  subscriptionStatus: {
    type: String,
    enum: ["active", "past_due", "canceled", "none"],
    default: "none",
  },
}, { timestamps: true });

userSchema.index({ formToken: 1 }, { unique: true, sparse: true });
userSchema.index({ formTokenPrefix: 1 }, { unique: true, sparse: true });

export default mongoose.model<IUser>("User", userSchema);
