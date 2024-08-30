import { getRepository } from "../db";
import { User } from "../db/entities/User";
import { ControllerFunction } from "../types";
import { verifyAccessToken } from "../utils/jwt";

export const authenticateToken: ControllerFunction = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const userRepository = getRepository(User);

    req.user = await userRepository.findOneByOrFail({ id: decoded.id });

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
