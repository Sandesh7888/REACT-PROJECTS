// // server/src/utils/buildTree.js
// import Member from "../models/Member.js";
// import mongoose from "mongoose";

// /**
//  * Safely builds a nested tree starting from rootId.
//  * Prevents infinite loops by keeping visited set.
//  */
// export default async function buildTree(rootId) {
//   if (!mongoose.Types.ObjectId.isValid(rootId)) return null;

//   const visited = new Set();

//   async function attachChildren(node) {
//     // if node is null, return null
//     if (!node) return null;

//     // mark visited to avoid cycles
//     const nid = node._id.toString();
//     if (visited.has(nid)) {
//       // cycle detected — stop further recursion for this node
//       return { ...node, children: [] };
//     }
//     visited.add(nid);

//     // find children where this node is listed as a parent
//     const kids = await Member.find({ parents: node._id }).lean().exec();

//     // recursively attach children
//     const children = [];
//     for (const k of kids) {
//       const childWithChildren = await attachChildren(k);
//       if (childWithChildren) children.push(childWithChildren);
//     }

//     return { ...node, children };
//   }

//   // load root and start building
//   const root = await Member.findById(rootId).lean().exec();
//   if (!root) return null;
//   return attachChildren(root);
// }
