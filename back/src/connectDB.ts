import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedInternalAdmin } from "./bootstrap/seedInternalAdmin";
import { ensureFormTokenIndexes } from "./bootstrap/ensureFormTokenIndexes";
import { mailprexMode } from "./config/mailprexMode";

dotenv.config();

export const jwtSecret: string = process.env.JWT_SECRET!;

const MONGODB_URI = process.env.MONGODB_URI!;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  bootstrapped: boolean;
};

declare global {
  // eslint-disable-next-line no-var
  var mailprexMongoose: MongooseCache | undefined;
}

const cache: MongooseCache = global.mailprexMongoose ?? {
  conn: null,
  promise: null,
  bootstrapped: false,
};

global.mailprexMongoose = cache;

async function runBootstrap(): Promise<void> {
  if (cache.bootstrapped) {
    return;
  }

  cache.bootstrapped = true;
  console.log(`[mailprex] mode=${mailprexMode}`);

  try {
    await seedInternalAdmin();
  } catch (error) {
    console.error("[mailprex] Internal admin seed skipped:", error);
  }

  try {
    await ensureFormTokenIndexes();
  } catch (error) {
    console.error("[mailprex] Form token index sync skipped:", error);
  }
}

const connectDB = async (): Promise<typeof mongoose> => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI).then((connection) => {
      console.log("Conectado a MongoDB");
      return connection;
    });
  }

  cache.conn = await cache.promise;
  await runBootstrap();

  return cache.conn;
};

export default connectDB;
