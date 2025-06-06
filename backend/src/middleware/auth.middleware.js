// middleware/verifyuser.js
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyuser = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.refreshToken;

    const authHeader = req.get("Authorization") || "";
    const headerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    const token = cookieToken || headerToken;

    if (!token) {
      return res.status(400).json({ message: "Unauthorized user" });
    }

    const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN);

    const user = await User.findById(decodeToken?._id);

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error", error);
    return res.status(401).json({ message: "Token verification failed" });
  }
};
