// src/components/Tree.jsx
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useMemo } from "react";

/**
 * Tree component - expects nested tree object with children[]
 * Each node can have .gender ("male"|"female"|"other")
 */
export default function Tree({ treeData }) {
  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    let row = 0;

    function nodeStyleForGender(gender) {
      if (gender === "male") return "#4A90E2";
      if (gender === "female") return "#FF69B4";
      return "#B0B0B0";
    }

    function walk(node, depth = 0) {
      if (!node) return;
      const id = String(node._id ?? node.id);
      const gender = node.gender ?? "other";

      nodes.push({
        id,
        data: { label: node.name || "Unknown" },
        position: { x: depth * 240, y: row * 100 },
        style: {
          backgroundColor: nodeStyleForGender(gender),
          color: "#fff",
          borderRadius: 8,
          padding: 8,
          minWidth: 120,
          textAlign: "center"
        }
      });

      row++;

      (node.children || []).forEach((child) => {
        const childId = String(child._id ?? child.id);
        edges.push({
          id: `e${id}-${childId}`,
          source: id,
          target: childId
        });
        walk(child, depth + 1);
      });
    }

    if (treeData) walk(treeData, 0);
    return { nodes, edges };
  }, [treeData]);

  return (
    <div style={{ width: "100%", height: "80vh", backgroundColor: "#f9f9f9" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
