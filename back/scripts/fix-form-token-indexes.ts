/**
 * Fixes legacy non-sparse formToken indexes and removes null token fields.
 * Run: npm run fix-form-token-indexes
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ensureFormTokenIndexes } from "../src/bootstrap/ensureFormTokenIndexes";

dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  await ensureFormTokenIndexes();
  console.log("Form token indexes fixed.");
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
