import { Router } from "express";
import buildTree from "../utils/buildTree.js";

const router = Router();

// GET /api/tree/:id  -> returns nested tree starting from :id
router.get("/:id", async (req, res, next) => {
  try {
    const tree = await buildTree(req.params.id);
    if (!tree) return res.status(404).json({ message: "Root not found" });
    res.json(tree);
  } catch (e) { next(e); }
});

export default router;
