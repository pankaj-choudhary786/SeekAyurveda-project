import express from "express";
import News from "../models/News.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(50);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;
