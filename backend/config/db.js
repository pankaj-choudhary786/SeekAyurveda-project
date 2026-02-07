import mongoose from "mongoose";

const url = "mongodb+srv://shouryathakur:shouryamongodb@shourya.ktyjuv5.mongodb.net/seekayur2?appName=shourya"

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
