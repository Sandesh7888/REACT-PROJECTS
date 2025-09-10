import express from "express";
import { createMember, getAllMembers, getFamilyTree } from "../controllers/memberController.js";

const router = express.Router();

router.post("/", createMember);      // Add new member
router.get("/", getAllMembers);      // Fetch all members
router.get("/tree/:id", getFamilyTree); // Get family tree by root member

export default router;
