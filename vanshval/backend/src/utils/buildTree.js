export default function buildTree(members, rootId) {
  const map = {};
  members.forEach(m => (map[m._id] = { ...m, children: [] }));

  let root = null;
  members.forEach(m => {
    if (m.parents?.length) {
      m.parents.forEach(pid => {
        if (map[pid]) map[pid].children.push(map[m._id]);
      });
    }
    if (m._id.toString() === rootId) root = map[m._id];
  });

  return root;
}
