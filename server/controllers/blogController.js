import Blog from "../models/Blog.js";

// GET all blog posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// GET post by slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// POST create new blog post
export const createPost = async (req, res) => {
  try {
    const { title, summary, content, date, cover } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newPost = new Blog({
      title,
      summary,
      content,
      date: date ? new Date(date) : new Date(),
      cover,
      slug
    });

    await newPost.save();
    res.status(201).json({ message: "Blog post created", post: newPost });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// PUT update a post
export const updatePost = async (req, res) => {
  try {
    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// DELETE post
export const deletePost = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
