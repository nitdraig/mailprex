import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
  formToken?: string;
  userType: "free" | "standard" | "business";
  requestCount: number;
  lastRequest: Date;
  verified: boolean;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: false },
  password: { type: String, required: true },
  formToken: {
    type: String,
    unique: true,
    required: false,
    sparse: true,
    default: null,
  },
  userType: {
    type: String,
    enum: ["free", "standard", "business"],
    default: "free",
  },
  requestCount: { type: Number, default: 0 },
  lastRequest: { type: Date, default: new Date() },
  verified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>("User", userSchema);
