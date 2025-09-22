// routes/tree.js
import express from "express";
import { getFamilyTree } from "../controllers/memberController.js";

const router = express.Router();

router.get("/:id", getFamilyTree); // remove `auth` for testing

export default router;
