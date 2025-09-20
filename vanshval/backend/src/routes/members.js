import express from "express";
import auth from "../middlewares/auth.js";
import { createMember, getAllMembers } from "../controllers/memberController.js";

const router = express.Router();

// Protected routes (create/get)
router.get("/", auth, getAllMembers);
router.post("/", auth, createMember);

export default router;
