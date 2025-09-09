import { useState } from "react";
import api from "../api";

export default function MemberForm({ onMemberAdded }) {
  const [form, setForm] = useState({
    name: "",
    parentsCsv: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parents = form.parentsCsv
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      await api.post("/members", {
        name: form.name,
        parents
      });

      alert("Member added successfully!");
      setForm({ name: "", parentsCsv: "" });
      onMemberAdded();
    } catch (error) {
      alert("Error adding member: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="member-form">
      <input
        type="text"
        placeholder="Member Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Parent IDs (comma-separated)"
        value={form.parentsCsv}
        onChange={(e) => setForm({ ...form, parentsCsv: e.target.value })}
      />
      <button type="submit">Add Member</button>
    </form>
  );
}
