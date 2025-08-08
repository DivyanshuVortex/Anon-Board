import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  const dburl = process.env.MONGO_URI;
  if (!dburl) {
    throw new Error("MONGO_URI not defined in .env");
  }

  try {
    await mongoose.connect(dburl);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
