// frontend/src/pages/MemberList.jsx
import React from "react";

export default function MemberList() {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Family Members</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>John Doe</li>
        <li>Jane Smith</li>
        <li>Michael Johnson</li>
      </ul>
    </div>
  );
}
