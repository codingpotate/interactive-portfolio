import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  cover: String,
  date: Date,
  slug: { type: String, unique: true }
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
