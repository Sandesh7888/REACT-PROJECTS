import { useState } from "react";
import api from "../api";

export default function MemberForm({ onAdded }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [parents, setParents] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/members", {
        name,
        gender,
        parents: parents.split(",").map((id) => id.trim()).filter(Boolean),
      });
      setName("");
      setParents("");
      onAdded && onAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding member");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Member Name" required />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        value={parents}
        onChange={(e) => setParents(e.target.value)}
        placeholder="Parent IDs (comma-separated)"
      />
      <button type="submit">Add Member</button>
    </form>
  );
}
