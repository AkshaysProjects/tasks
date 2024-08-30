import { omit } from "lodash";
import { getRepository } from "../db";
import { Task } from "../db/entities/Task";
import { ControllerFunction } from "../types";

// Get all tasks
export const getAllTasks: ControllerFunction = async (req, res) => {
  try {
    const taskRepository = getRepository(Task);
    const tasks = await taskRepository
      .createQueryBuilder("task")
      .where("task.user = :userId", { userId: req.user.id })
      .getMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

// Get a single task by ID
export const getTaskById: ControllerFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOneByOrFail({ id: +id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the task", error });
  }
};

// Create a new task
export const createTask: ControllerFunction = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const taskRepository = getRepository(Task);
    const task = taskRepository.create({
      title,
      description,
      dueDate,
      status,
      user: req.user,
    });
    await taskRepository.save(task);

    res.status(201).json(omit(task, "user"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating the task", error });
  }
};

// Update a task by ID
export const updateTaskById: ControllerFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOneByOrFail({ id: +id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskRepository.save({ ...task, ...req.body });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating the task", error });
  }
};

// Delete a task by ID
export const deleteTaskById: ControllerFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOneByOrFail({ id: +id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskRepository.remove(task);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the task", error });
  }
};
