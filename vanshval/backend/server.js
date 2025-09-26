import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import memberRoutes from "./src/routes/members.js";
import treeRoutes from "./src/routes/tree.js";
import familiesRoutes from './src/routes/families.js';



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/tree", treeRoutes);
app.use('/api/families', familiesRoutes);

// root
app.get("/", (req, res) => res.send("🌳 Vanshval API running"));

// Start
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err.message);
    process.exit(1);
  });