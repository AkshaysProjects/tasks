import express from "express";

// Create a new express application instance
const app = express();

// Define a route handler for the default home page
app.get("/", (_req, res) => {
  res.send("Hello World");
});

export default app;
