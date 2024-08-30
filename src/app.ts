import express from "express";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";

// Create a new express application instance
const app = express();

// JSON parser
app.use(express.json());

// Define a route handler for the default home page
app.get("/", (_req, res) => {
  res.send("Hello World");
});

// Auth Routes
app.use("/auth", authRouter);

// Tasks Routes
app.use("/tasks", taskRouter);

export default app;
