import express from "express";
import { getTree } from "../controllers/memberController.js";
const router = express.Router();

router.get("/", getTree);

export default router;
