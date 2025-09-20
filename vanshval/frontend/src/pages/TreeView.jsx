import React, { useEffect, useState } from "react";
import api from "../api/index.js";
import Tree from "../components/Tree.jsx";

export default function TreeView() {
  const [members, setMembers] = useState([]);
  const [rootId, setRootId] = useState("");
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    api.get("/members").then(r => setMembers(r.data)).catch(()=>setMembers([]));
  }, []);

  const loadTree = async () => {
    if (!rootId) return alert("Select root member");
    try {
      const { data } = await api.get(`/tree/${rootId}`);
      setTreeData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tree: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <h2>Family Tree</h2>
      <div style={{ display:"flex", gap:8, alignItems:"center"}}>
        <select value={rootId} onChange={(e)=>setRootId(e.target.value)}>
          <option value="">— Select root —</option>
          {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
        <button onClick={loadTree}>Load Tree</button>
      </div>

      {treeData ? <Tree treeData={treeData} /> : <p style={{ marginTop:12 }}>Select a root to view tree</p>}
    </div>
  );
}
