import express from 'express';
import Family from '../models/Family.js';

const router = express.Router();

// POST /api/families
router.post('/', async (req, res) => {
  try {
    const family = new Family({ name: req.body.name });
    await family.save();
    res.status(201).json(family);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/families
router.get('/', async (_req, res) => {
  const families = await Family.find();
  res.json(families);
});

export default router;
