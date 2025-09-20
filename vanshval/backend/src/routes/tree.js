import express from "express";
import auth from "../middlewares/auth.js";
import { getFamilyTree } from "../controllers/memberController.js";

const router = express.Router();

// GET /api/tree/:id  (protected)
router.get("/:id", auth, getFamilyTree);

export default router;
