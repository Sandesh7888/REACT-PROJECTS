import express from 'express';
import Family from '../models/Family.js';
import Member from '../models/Member.js';

const router = express.Router();

// GET /api/tree?familyId=xxxxx
router.get('/', async (req, res) => {
  try {
    const { familyId } = req.query;
    if (!familyId) return res.status(400).json({ error: 'familyId is required' });

    // Load all members of this family with parents & spouses populated
    const members = await Member.find({ family: familyId })
      .populate('parents')
      .populate('spouses');

    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
