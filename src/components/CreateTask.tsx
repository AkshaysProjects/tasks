"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";

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
import { useRouter } from "next/navigation";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export default function CreateTask() {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: new Date().toISOString(),
    status: "PENDING",
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      const newDateTime = new Date(newDate);
      const [hours, minutes] = time.split(":");
      newDateTime.setHours(parseInt(hours), parseInt(minutes));
      setTask((prev) => ({
        ...prev,
        dueDate: newDateTime.toISOString(),
      }));
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (date) {
      const [hours, minutes] = newTime.split(":");
      const newDateTime = new Date(date);
      newDateTime.setHours(parseInt(hours), parseInt(minutes));
      setTask((prev) => ({
        ...prev,
        dueDate: newDateTime.toISOString(),
      }));
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setTask((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } finally {
      setIsSubmitting(false);
      router.push("/dashboard");
    }
  };

  if (isSubmitting) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
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
              setTask((prev) => ({ ...prev, description: e.target.value }))
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
          <Select onValueChange={handleStatusChange} defaultValue={task.status}>
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

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Create Task
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
