import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISend extends Document {
  userId: Types.ObjectId;
  to: string;
  webName: string;
  status: "sent" | "failed";
  error?: string;
  createdAt: Date;
}

const sendSchema = new Schema<ISend>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: String, required: true, lowercase: true },
    webName: { type: String, required: true },
    status: { type: String, enum: ["sent", "failed"], required: true },
    error: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

sendSchema.index({ userId: 1, to: 1, createdAt: -1 });
sendSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ISend>("Send", sendSchema);
