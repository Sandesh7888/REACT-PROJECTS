import Member from "../models/Member.js";

export default async function buildTree(rootId) {
  const root = await Member.findById(rootId).lean();
  if (!root) return null;
  return await attachChildren(root);
}

async function attachChildren(node) {
  const kids = await Member.find({ parents: node._id }).lean();
  const children = await Promise.all(kids.map(k => attachChildren(k)));
  return { ...node, children };
}
