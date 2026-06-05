import mongoose, { Document, Schema } from "mongoose";

export interface IRevokedToken extends Document {
  jti: string;
  expiresAt: Date;
}

const revokedTokenSchema = new Schema<IRevokedToken>({
  jti: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.model<IRevokedToken>(
  "RevokedToken",
  revokedTokenSchema
);
