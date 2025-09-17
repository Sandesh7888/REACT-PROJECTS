// Build nested member tree from a flat list
export default function buildTree(members) {
  const map = {};
  members.forEach(m => map[m._id] = { ...m._doc, children: [] });
  const roots = [];

  members.forEach(m => {
    if (m.parent) map[m.parent]?.children.push(map[m._id]);
    else roots.push(map[m._id]);
  });
  return roots;
}
