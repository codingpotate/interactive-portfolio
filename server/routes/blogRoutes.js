import express from "express";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);
router.post("/", createPost);
router.put("/:slug", updatePost);
router.delete("/:slug", deletePost);

export default router;
