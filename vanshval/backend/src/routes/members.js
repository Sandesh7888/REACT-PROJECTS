import express from "express";
import { createMember, getMembers, getTree } from "../controllers/memberController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createMember);
router.get("/", auth, getMembers);
router.get("/tree/:id", auth, getTree);

export default router;
