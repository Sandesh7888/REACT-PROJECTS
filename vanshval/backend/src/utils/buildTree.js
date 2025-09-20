// Build nested tree from flat members list (members must be plain objects or lean())
export default function buildTree(members, rootId) {
  const map = {};
  members.forEach((m) => {
    map[m._id.toString()] = { ...m, _id: m._id.toString(), children: [] };
  });

  members.forEach((m) => {
    if (m.parents && m.parents.length) {
      m.parents.forEach((pid) => {
        const parentId = pid.toString();
        if (map[parentId]) map[parentId].children.push(map[m._id.toString()]);
      });
    }
  });

  // If rootId provided, return that subtree; else return all top-level nodes
  if (rootId) return map[rootId.toString()] || null;

  const roots = [];
  for (const id in map) {
    const m = map[id];
    const hasParent = (m.parents && m.parents.length && m.parents.some((p) => map[p.toString()]));
    if (!hasParent) roots.push(m);
  }
  return roots;
}
