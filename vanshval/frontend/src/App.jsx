// inside imports
import { useState, useEffect } from "react";
import Tree from "./components/Tree";
import MemberForm from "./components/MemberForm";
import api from "./api";
import "./App.css";

export default function App() {
  const [rootId, setRootId] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [members, setMembers] = useState([]);

  // fetch all members for selector
  const fetchMembers = async () => {
    try {
      const { data } = await api.get("/members");
      setMembers(data);
    } catch (err) {
      console.error("Failed to load members", err);
    }
  };

  // Fetch tree from backend
  const fetchTree = async (id) => {
    const useId = id || rootId;
    if (!useId) return alert("Select Root Member!");
    try {
      const { data } = await api.get(`/tree/${useId}`);
      setTreeData(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching tree: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🌳 Vanshval — Family Tree</h1>

        <div className="form-inline">
          <select value={rootId} onChange={(e) => setRootId(e.target.value)}>
            <option value="">— Select root member —</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name} — {m._id.slice(0, 8)}{/* short id shown */}
              </option>
            ))}
          </select>

          <button onClick={() => fetchTree()}>Load Tree</button>
        </div>
      </header>

      <MemberForm onMemberAdded={() => { fetchMembers(); fetchTree(); }} />

      <main>
        {treeData ? <Tree treeData={treeData} /> : <p style={{ marginTop: "1rem" }}>Select a root to load the tree.</p>}
      </main>
    </div>
  );
}
