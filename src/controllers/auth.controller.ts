import { getRepository } from "../db";
import { User } from "../db/entities/User";
import { ControllerFunction } from "../types";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

// Registration
export const createUser: ControllerFunction = async (req, res) => {
  const userRepository = getRepository(User);
  try {
    const { username, password } = req.body;
    const user = await userRepository.save({
      username,
      password: hashPassword(password),
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: "User created successfully",
      id: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Login
export const loginUser: ControllerFunction = async (req, res) => {
  const userRepository = getRepository(User);
  try {
    const { username, password } = req.body;
    const user = await userRepository.findOneByOrFail({ username });

    if (!comparePassword(user, password)) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "Login successful",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

// Refresh Token Validation
export const refreshAccessToken: ControllerFunction = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refresh_token);
    const userRepository = getRepository(User);
    const user = await userRepository.findOneByOrFail({ id: decoded.id });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res
      .status(200)
      .json({ access_token: newAccessToken, refresh_token: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
