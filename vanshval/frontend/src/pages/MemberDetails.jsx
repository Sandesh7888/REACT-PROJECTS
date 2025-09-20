import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/index.js";

export default function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    api.get(`/members/${id}`)
      .then(res => setMember(res.data))
      .catch(() => setMember(null));
  }, [id]);

  if (!member) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{member.name}</h2>
      <p>Gender: {member.gender}</p>
      <p>DOB: {member.dob ? new Date(member.dob).toDateString() : "—"}</p>
      <p>DOD: {member.dod ? new Date(member.dod).toDateString() : "—"}</p>
      <p>Info: {member.info || "—"}</p>
      <p>Family: {member.family?.name} ({member.family?._id})</p>
      <p>Parents: {member.parents?.map(p => p.name).join(", ")}</p>
      <p>Spouses: {member.spouses?.map(s => s.name).join(", ")}</p>
      <p>Children: {member.children?.map(c => c.name).join(", ")}</p>
    </div>
  );
}
