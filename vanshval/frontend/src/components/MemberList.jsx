import React, { useEffect, useState } from "react";
import api from "../api/index.js";

export default function MemberList() {
  const [members, setMembers] = useState([]);
  useEffect(()=> {
    api.get("/members").then(r => setMembers(r.data)).catch(()=>setMembers([]));
  }, []);
  return (
    <div>
      <h3>Members</h3>
      <ul>
        {members.map(m => <li key={m._id}>{m.name} — {m.gender}</li>)}
      </ul>
    </div>
  );
}
