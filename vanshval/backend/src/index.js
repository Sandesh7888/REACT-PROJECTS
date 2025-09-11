import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import memberRoutes from "./routes/members.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/members", memberRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🌳 Vanshval API is running!");
});

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vanshval";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
