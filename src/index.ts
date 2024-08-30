import app from "./app";
import dataSource from "./db";
import { env } from "./env";

// Function to start the app
async function startApp() {
  await dataSource
    .initialize()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
    });
  app.listen(env.PORT, () => {
    console.log("Server is running on port 3000");
  });
}

// Start the app
startApp();
