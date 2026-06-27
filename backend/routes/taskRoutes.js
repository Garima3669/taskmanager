import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Create Task
router.post("/", createTask);

// Get All Tasks
router.get("/", getAllTasks);

// Get Single Task
router.get("/:id", getTaskById);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

// Update Task Status
router.patch("/:id/status", updateTaskStatus);

export default router;