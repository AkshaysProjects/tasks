import "dotenv/config";
import { z } from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
  // Server Config
  PORT: z.coerce.number().default(3000),

  // Database Config
  DATABASE_URL: z.string(),
});

// Ensure the parsed environment variables
export const env = envSchema.parse(process.env);
