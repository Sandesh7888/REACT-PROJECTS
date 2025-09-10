import { Router } from "express";
import {
  createMember, getMembers, getMemberById, updateMember, deleteMember
} from "../controllers/memberController.js";

const router = Router();

router.get("/", getMembers);
router.post("/", createMember);
router.get("/:id", getMemberById);
router.patch("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
