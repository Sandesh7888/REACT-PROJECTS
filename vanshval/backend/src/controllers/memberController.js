import Member from "../models/Member.js";
import buildTree from "../utils/buildTree.js";

// create member
export const createMember = async (req, res) => {
  try {
    const { name, gender = "other", parents = [], spouses = [], family, notes } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    // optionally validate family id if required
    const member = new Member({ name, gender, parents, spouses, family, notes });
    await member.save();

    const out = await Member.findById(member._id).populate("parents spouses children");
    res.status(201).json(out);
  } catch (err) {
    console.error("createMember error:", err);
    if (err.name === "ValidationError") return res.status(422).json({ message: err.message, details: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};

// get all members (optionally filter by user if you add createdBy)
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 }).lean();
    res.json(members);
  } catch (err) {
    console.error("getAllMembers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// get tree by root id
export const getFamilyTree = async (req, res) => {
  try {
    const rootId = req.params.id;
    const members = await Member.find().lean();
    const tree = buildTree(members, rootId);
    if (!tree) return res.status(404).json({ message: "Root member not found" });
    res.json(tree);
  } catch (err) {
    console.error("getFamilyTree error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
