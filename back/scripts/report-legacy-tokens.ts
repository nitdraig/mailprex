/**
 * Reports users still using legacy plaintext UUID form tokens.
 * Run: npx ts-node scripts/report-legacy-tokens.ts
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/userModel";

dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const legacyUsers = await User.find({
    formToken: { $exists: true, $nin: [null, ""] },
    formTokenHash: { $exists: false },
  }).select("email formToken createdAt updatedAt");

  if (legacyUsers.length === 0) {
    console.log("No legacy form tokens found.");
  } else {
    console.log(`Found ${legacyUsers.length} user(s) with legacy UUID tokens:`);
    for (const user of legacyUsers) {
      console.log(
        `- ${user.email} (prefix ${String(user.formToken).slice(0, 8)}…)`
      );
    }
    console.log(
      "\nAsk these users to regenerate their token in the dashboard (mk_live_ format)."
    );
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
