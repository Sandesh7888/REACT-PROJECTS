import React from "react";
import { Link } from "react-router-dom";

export default function MemberList({ members = [] }) {
  return (
    <div className="grid gap-3">
      {members.map((m) => (
        <Link
          to={`/members/${m._id}`}
          key={m._id}
          className="p-3 bg-white rounded shadow flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
            {m.name?.[0]}
          </div>
          <div>
            <div className="font-medium">{m.name}</div>
            <div className="text-sm text-slate-500">
              {m.gender} • {m.dob}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
