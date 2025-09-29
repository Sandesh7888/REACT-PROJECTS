import React from "react";
import Tree from "../components/Tree.jsx";

export default function TreeView() {
  // Example data (replace with props or API data later)
  const sampleNodes = [
    { id: 1, name: "Grandparent", gender: "male" },
    { id: 2, name: "Parent", gender: "female", parentId: 1 },
    { id: 3, name: "Child", gender: "male", parentId: 2 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Family Tree</h1>
      <Tree nodes={sampleNodes} />
    </div>
  );
}
