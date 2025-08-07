import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
