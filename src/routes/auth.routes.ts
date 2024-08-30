import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import {
  createUser,
  loginUser,
  refreshAccessToken,
} from "../controllers/auth.controller";
import { userSchema } from "../schemas/user.schema";

const authRouter = Router();

// Register a new user
authRouter.post("/register", validateRequestBody(userSchema), createUser);

// Login a user
authRouter.post("/login", validateRequestBody(userSchema), loginUser);

// Refresh Access Token
authRouter.post("/refresh", refreshAccessToken);

export default authRouter;
