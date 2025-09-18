import express from "express";
import { addMember, getMembers } from "../controllers/memberController.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();



router.get("/", protect, getMembers);
router.post("/", protect, addMember);

export default router;
