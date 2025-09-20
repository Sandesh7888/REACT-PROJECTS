import Member from "../models/Member.js";
import buildTree from "../utils/buildTree.js";

// ✅ Create
export const createMember = async (req, res) => {
  try {
    const { name, gender, dob, dod, info, parents = [], spouses = [], family } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const member = new Member({ name, gender, dob, dod, info, parents, spouses, family });
    await member.save();
    res.status(201).json(await Member.findById(member._id).populate("parents spouses children family"));
  } catch (err) {
    console.error("createMember error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Read (all)
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate("family").sort({ name: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Read (single)
export const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate("parents spouses children family");
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("parents spouses children family");
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Tree
export const getFamilyTree = async (req, res) => {
  try {
    const rootId = req.params.id;
    const members = await Member.find().lean();
    const tree = buildTree(members, rootId);
    if (!tree) return res.status(404).json({ message: "Root not found" });
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};