
import React from "react";
import { useParams } from "react-router-dom";

export default function MemberDetails() {
  const { id } = useParams();
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Member {id}</h2>
      <p className="text-sm text-slate-500">
        Details page — wire to API to fetch member.
      </p>
    </div>
  );
}
