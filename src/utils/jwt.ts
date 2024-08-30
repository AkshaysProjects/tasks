import jwt from "jsonwebtoken";
import { User } from "../db/entities/User";
import { env } from "../env";

export const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user.id }, env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign({ id: user.id }, env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as { id: number };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET!) as { id: number };
};
