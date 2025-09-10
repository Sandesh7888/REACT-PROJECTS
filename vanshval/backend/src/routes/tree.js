// server/src/routes/tree.js
import { Router } from "express";
import mongoose from "mongoose";
import buildTree from "../utils/buildTree.js";

const router = Router();

// GET /api/tree/:id  -> returns nested tree starting from :id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // validate ObjectId early to avoid CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid member id format" });
    }

    const tree = await buildTree(id);

    if (!tree) return res.status(404).json({ message: "Root not found" });

    res.json(tree);
  } catch (err) {
    // log full error server-side for debugging
    console.error("Error in GET /api/tree/:id", err);
    // send helpful message to client
    res.status(500).json({ message: "Server error while building tree", error: err.message });
  }
});

export default router;
