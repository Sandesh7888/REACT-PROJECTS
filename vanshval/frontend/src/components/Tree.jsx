import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { useEffect, useState } from "react";
import api from "../api";
import genderColors from "../utils/genderColors";

export default function Tree({ rootId }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (!rootId) return;
    api.get(`/members/tree/${rootId}`).then((res) => {
      const { nodes, edges } = res.data;
      setNodes(
        nodes.map((n) => ({
          ...n,
          style: { background: genderColors[n.data.gender] },
        }))
      );
      setEdges(edges);
    });
  }, [rootId]);

  return (
    <div style={{ height: "600px", border: "1px solid #ddd" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
