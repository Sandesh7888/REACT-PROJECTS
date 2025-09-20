import React, { useEffect, useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

export default function Tree({ treeData }) {
  const { nodes, edges } = useMemo(() => {
    const nodes = [], edges = [];
    let row = 0;

    function walk(node, depth=0) {
      if (!node) return;
      nodes.push({
        id: node._id,
        data: { label: node.name, gender: node.gender },
        position: { x: depth * 220, y: row * 100 },
        style: {
          backgroundColor: node.gender === "male" ? "#4A90E2" : node.gender === "female" ? "#FF69B4" : "#B0B0B0",
          color: "#fff",
          borderRadius: 8,
          padding: 8,
          minWidth: 120,
          textAlign: "center"
        }
      });
      row++;
      (node.children || []).forEach(child => {
        edges.push({ id: `e${node._id}-${child._id}`, source: node._id, target: child._id });
        walk(child, depth+1);
      });
    }

    if (treeData) walk(treeData, 0);
    return { nodes, edges };
  }, [treeData]);

  return (
    <div className="tree-area">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
