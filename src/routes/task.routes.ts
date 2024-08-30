import express from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const taskRouter = express.Router();

// Guard routes with authenticateToken middleware
taskRouter.use(authenticateToken);

// Get all tasks
taskRouter.get("/", getAllTasks);

// Get a single task by ID
taskRouter.get("/:id", getTaskById);

// Create a new task
taskRouter.post("/", createTask);

// Update a task by ID
taskRouter.put("/:id", updateTaskById);

// Delete a task by ID
taskRouter.delete("/:id", deleteTaskById);

export default taskRouter;
