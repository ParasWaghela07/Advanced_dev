import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error("DB Connection Error:", error.message);
    process.exit(1);
  }
};