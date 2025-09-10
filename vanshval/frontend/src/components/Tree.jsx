// src/components/Tree.jsx
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useMemo } from "react";

export default function Tree({ treeData }) {
  // Convert nested tree to nodes & edges
  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    const edges = [];

    let row = 0;
    function walk(node, depth = 0) {
      nodes.push({
        id: node._id,
        data: { label: node.name },
        position: { x: depth * 220, y: row * 100 }
      });
      row++;

      (node.children || []).forEach((child) => {
        edges.push({
          id: `e${node._id}-${child._id}`,
          source: node._id,
          target: child._id
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
