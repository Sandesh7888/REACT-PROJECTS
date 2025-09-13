// backend/src/middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust path if your User model is elsewhere
import dotenv from "dotenv";
dotenv.config();

export default async function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user (optional). If users stored outside src/models, change path above.
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
