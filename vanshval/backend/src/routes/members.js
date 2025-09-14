import express from "express";
import { createMember, getMembers, getTree } from "../controllers/memberController.js";
import User from "../models/User.js";
import auth from "./src/middlewares/auth.js";



const router = express.Router();

router.post("/", auth, createMember);
router.get("/", auth, getMembers);
router.get("/tree/:id", auth, getTree);

export default router;
