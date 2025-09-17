import Member from "../models/Member.js";
import buildTree from "../utils/buildTree.js";

export const addMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMembers = async (req, res) => {
  const members = await Member.find().lean();
  res.json(members);
};

export const getTree = async (req, res) => {
  const members = await Member.find().lean();
  res.json(buildTree(members));
};
