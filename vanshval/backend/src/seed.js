import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Family from "./models/Family.js";

dotenv.config();
await connectDB();
await Family.create({ name: "Default Family" });
console.log("Seeded family");
process.exit();
