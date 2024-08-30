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
import { Suspense } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "PENDING" | "COMPLETED" | "IN_PROGRESS";
  createdAt: string;
  updatedAt: string;
};

async function getTasks(): Promise<Task[]> {
  return api
    .get("/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data);
}

function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Link href={`/task/${task.id}`} className="hover:underline">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

async function TasksContent() {
  const tasks = await getTasks();
  return <TaskTable tasks={tasks} />;
}

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Task Dashboard</h1>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TasksContent />
      </Suspense>
    </div>
  );
}
