// src/pages/TreeView.jsx
import React, { useEffect, useState } from "react";
import api from "../api/index.js";
import Tree from "../components/Tree.jsx";

export default function TreeView() {
  const [members, setMembers] = useState([]);
  const [rootId, setRootId] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    api.get("/members")
      .then((r) => setMembers(r.data || []))
      .catch(() => setMembers([]));
  }, []);

  const load = async () => {
    if (!rootId) return alert("Select a root");
    try {
      const r = await api.get(`/tree/${rootId}`);
      setRaw(r.data);
      setTreeData(r.data);
      // also log to console
      // eslint-disable-next-line no-console
      console.log("API /tree response:", r.data);
    } catch (err) {
      console.error("Load tree error:", err);
      alert("Failed to load tree: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <h2>Family Tree (debug)</h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select value={rootId} onChange={(e) => setRootId(e.target.value)}>
          <option value="">— Select root —</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
        <button onClick={load}>Load Tree</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Raw API response:</strong>
        <pre style={{ maxHeight: 240, overflow: "auto", background: "#fff", padding: 8 }}>{JSON.stringify(raw, null, 2)}</pre>
      </div>

      <div style={{ marginTop: 12 }}>
        <Tree treeData={treeData} />
      </div>
    </div>
  );
}
