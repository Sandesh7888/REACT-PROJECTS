import React from "react";

export default function TreeVisual({ nodes = [] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tree Visualization</h2>
      <ul className="list-disc pl-5">
        {nodes.map((node) => (
          <li key={node.id}>
            {node.name} ({node.gender})
          </li>
        ))}
      </ul>
    </div>
  );
}
