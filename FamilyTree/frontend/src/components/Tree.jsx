import React from "react";
import TreeVisual from "./TreeVisual.jsx";

export default function Tree({ nodes = [] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <TreeVisual nodes={nodes} />
    </div>
  );
}
