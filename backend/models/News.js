import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  source: String,
  url: String,
  imageUrl: String,
  publishedAt: Date
});

export default mongoose.model('News', newsSchema);
