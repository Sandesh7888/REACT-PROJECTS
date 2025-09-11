import express from "express";
import {
  createMember,
  getAllMembers,
  getFamilyTree,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/", createMember); // Add a member
router.get("/", getAllMembers); // Get all members
router.get("/tree/:id", getFamilyTree); // Get family tree

export default router;
