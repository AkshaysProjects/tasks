import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
