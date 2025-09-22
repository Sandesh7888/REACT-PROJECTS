// src/components/Tree.jsx
import React from "react";

const colors = {
  male: "#4DA6FF",
  female: "#FF4DA6",
};

function TreeNode({ member }) {
  return (
    <div style={{ marginLeft: 20, marginTop: 8 }}>
      <div
        style={{
          display: "inline-block",
          padding: "4px 8px",
          borderRadius: 8,
          backgroundColor: colors[member.gender] || "#ccc",
          color: "#fff",
        }}
      >
        {member.name} ({new Date(member.birthDate).getFullYear()})
      </div>
      {member.children && member.children.length > 0 && (
        <div style={{ marginLeft: 20 }}>
          {member.children.map((child) => (
            <TreeNode key={child._id} member={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Tree({ treeData }) {
  if (!treeData) return null;
  return (
    <div>
      <TreeNode member={treeData} />
    </div>
  );
}
