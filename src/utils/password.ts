import bcrypt, { compareSync } from "bcryptjs";
import { User } from "../db/entities/User";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (user: User, password: string) => {
  return compareSync(password, user.password);
};
