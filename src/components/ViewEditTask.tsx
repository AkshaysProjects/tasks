"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useEffect, useState } from "react";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { useParams } from "next/navigation";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewEditTask() {
  const [task, setTask] = useState<Task | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { id: taskId } = useParams();

  useEffect(() => {
    async function fetchTask() {
      const task = await api
        .get<Task>(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => res.data);
      setTask(task);
      setDate(new Date(task.dueDate));
      setTime(format(new Date(task.dueDate), "HH:mm"));
    }
    fetchTask();
  }, [taskId]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      const newDateTime = new Date(newDate);
      const [hours, minutes] = time.split(":");
      newDateTime.setHours(parseInt(hours), parseInt(minutes));
      setTask(
        (prev) => ({ ...prev, dueDate: newDateTime.toISOString() } as Task)
      );
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (date) {
      const [hours, minutes] = newTime.split(":");
      const newDateTime = new Date(date);
      newDateTime.setHours(parseInt(hours), parseInt(minutes));
      setTask(
        (prev) => ({ ...prev, dueDate: newDateTime.toISOString() } as Task)
      );
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setTask((prev) => ({ ...prev, status: newStatus } as Task));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      await api.put(`/tasks/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setIsEditing(false); // Switch back to view mode after saving
    }
  };

  if (!task) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      {!isEditing ? (
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{task.title}</h2>
          <p className="text-gray-700 mt-2">{task.description}</p>
          <div className="mt-4 text-gray-600">
            <p>Due Date: {format(new Date(task.dueDate), "PPP p")}</p>
            <p>Status: {task.status}</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Created: {format(new Date(task.createdAt), "PPP p")}</p>
            <p>Updated: {format(new Date(task.updatedAt), "PPP p")}</p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white w-full"
          >
            Edit Task
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={task.title}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, title: e.target.value } as Task))
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) =>
                setTask(
                  (prev) =>
                    ({
                      ...prev,
                      description: e.target.value,
                    } as Task)
                )
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-[120px]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={handleStatusChange}
              defaultValue={task.status}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Created: {format(new Date(task.createdAt), "PPP p")}
            </p>
            <p className="text-sm text-gray-500">
              Updated: {format(new Date(task.updatedAt), "PPP p")}
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
