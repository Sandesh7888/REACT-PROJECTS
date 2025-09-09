import { useState, useEffect } from "react";
import Tree from "./components/Tree";
import MemberForm from "./components/MemberForm";
import api from "./api";
import "./App.css";

export default function App() {
  const [rootId, setRootId] = useState("");
  const [treeData, setTreeData] = useState(null);

  // Fetch tree from backend
  const fetchTree = async () => {
    if (!rootId) return alert("Enter Root Member ID!");
    try {
      const { data } = await api.get(`/tree/${rootId}`);
      setTreeData(data);
    } catch (error) {
      alert("Error fetching tree: " + error.message);
    }
  };

  useEffect(() => {
    if (rootId) fetchTree();
  }, [rootId]);

  return (
    <div className="container">
      <header>
        <h1>🌳 Vanshval — Family Tree</h1>
        <div className="form-inline">
          <input
            type="text"
            placeholder="Enter Root Member ID"
            value={rootId}
            onChange={(e) => setRootId(e.target.value)}
          />
          <button onClick={fetchTree}>Load Tree</button>
        </div>
      </header>

      <MemberForm onMemberAdded={fetchTree} />

      <main>
        {treeData ? (
          <Tree treeData={treeData} />
        ) : (
          <p style={{ marginTop: "1rem" }}>Enter a root ID to load the tree.</p>
        )}
      </main>
    </div>
  );
}
