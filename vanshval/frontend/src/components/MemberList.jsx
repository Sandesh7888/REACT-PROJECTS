import { useEffect, useState } from "react";
import api from "../api";

export default function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get("/members").then((res) => setMembers(res.data));
  }, []);

  return (
    <ul>
      {members.map((m) => (
        <li key={m._id}>
          {m.name} ({m.gender})
        </li>
      ))}
    </ul>
  );
}
