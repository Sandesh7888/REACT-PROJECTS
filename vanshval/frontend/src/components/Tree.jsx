// src/components/Tree.jsx
import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

/**
 * Helper: build nodes/edges from nested tree(s)
 * Accepts:
 *  - single root object with .children
 *  - array of root objects
 */
function buildNodesEdges(treeData) {
  const nodes = [];
  const edges = [];
  let row = 0;

  // simple layout: depth -> x, row++ -> y
  function walk(node, depth = 0) {
    if (!node) return;
    const id = String(node._id ?? node.id);
    nodes.push({
      id,
      data: { label: node.name ?? "(no name)", gender: node.gender ?? "other" },
      position: { x: depth * 220, y: row * 100 },
      style: {
        background: node.gender === "male" ? "#4A90E2" : node.gender === "female" ? "#FF69B4" : "#B0B0B0",
        color: "#fff",
        borderRadius: 8,
        padding: 8,
        minWidth: 120,
        textAlign: "center"
      }
    });
    row++;

    const children = node.children || [];
    for (const child of children) {
      const childId = String(child._id ?? child.id);
      edges.push({ id: `e-${id}-${childId}`, source: id, target: childId });
      walk(child, depth + 1);
    }
  }

  if (Array.isArray(treeData)) {
    // multiple roots
    for (const root of treeData) walk(root, 0);
  } else {
    walk(treeData, 0);
  }

  return { nodes, edges };
}

export default function Tree({ treeData }) {
  // debug log so you can inspect what's coming in
  // eslint-disable-next-line no-console
  console.log("Tree.jsx incoming treeData:", treeData);

  const { nodes, edges } = useMemo(() => {
    if (!treeData) return { nodes: [], edges: [] };
    try {
      return buildNodesEdges(treeData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error building nodes/edges:", err);
      return { nodes: [], edges: [] };
    }
  }, [treeData]);

  // empty-state helpful message
  if (!treeData) {
    return <div style={{ padding: 12 }}>No tree data — select a root and click "Load Tree".</div>;
  }

  if (!nodes.length) {
    return <div style={{ padding: 12 }}>No visible nodes were built from the data. Check console for treeData shape.</div>;
  }

  return (
    <div style={{ width: "100%", height: "70vh", backgroundColor: "#f9f9f9" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
