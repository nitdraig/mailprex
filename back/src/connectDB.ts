import mongoose from "mongoose";
import dotenv from "dotenv";

export const jwtSecret: string = process.env.JWT_SECRET!;

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
