import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import { syncNews } from "./services/newsSync.js";
import { startNewsCron } from "./crone/syncjob.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);

// Health check (recommended)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start cron job after DB connection
    startNewsCron();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
