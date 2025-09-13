import Member from "../models/Member.js";
import buildTree from "../utils/buildTree.js";

export const createMember = async (req, res) => {
  try {
    const { name, gender, parents, spouses } = req.body;
    const member = await Member.create({
      name,
      gender,
      parents,
      spouses,
      createdBy: req.user._id
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find({ createdBy: req.user._id });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTree = async (req, res) => {
  try {
    const root = await Member.findById(req.params.id)
      .populate("children spouses parents");
    if (!root) return res.status(404).json({ message: "Root not found" });

    const members = await Member.find({ createdBy: req.user._id }).lean();
    const tree = buildTree(members, root._id.toString());
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
