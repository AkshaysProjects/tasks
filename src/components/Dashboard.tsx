"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "PENDING" | "COMPLETED" | "IN_PROGRESS";
  createdAt: string;
  updatedAt: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await api
          .get<Task[]>("/tasks", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((res) => res.data);
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function handleDelete(taskId: number) {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Task Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Link href={`/tasks/${task.id}`} className="hover:underline">
                  {task.title}
                </Link>
              </TableCell>
              <TableCell>
                {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.status === "COMPLETED"
                      ? "default"
                      : task.status === "IN_PROGRESS"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {task.status[0].toUpperCase() +
                    task.status.substring(1).toLowerCase().replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
