import React from "react";
import "./TreeVisual.css";

const TreeNode = ({ member }) => {
  const genderClass = member.gender === "male" ? "male" : "female";

  return (
    <div className="tree-node">
      <div className={`member ${genderClass}`}>
        <div className="name">{member.name}</div>
        <div className="birthDate">{new Date(member.birthDate).toLocaleDateString()}</div>
      </div>
      {member.children && member.children.length > 0 && (
        <div className="children">
          {member.children.map((child) => (
            <TreeNode key={child._id} member={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function TreeVisual({ treeData }) {
  if (!treeData) return null;
  return (
    <div className="tree-container">
      <TreeNode member={treeData} />
    </div>
  );
}
