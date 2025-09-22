// frontend/src/components/MemberForm.jsx
import React, { useState, useEffect } from "react";
import api from "../api/index.js";

function looksLikeObjectId(val) {
  return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
}

export default function MemberForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    gender: "other",
    birthDate: "",        // ISO date string, e.g. 2025-09-22
    parentsCsv: "",
    spousesCsv: "",
    family: ""
  });
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get("/members").then(r => setMembers(r.data || [])).catch(()=>setMembers([]));
  }, []);

  const parseCsv = (csv) => csv.split(",").map(s=>s.trim()).filter(Boolean);

  const resolveNamesToIds = (tokens) => {
    const ids = [], missing = [];
    tokens.forEach(t => {
      if (looksLikeObjectId(t)) { ids.push(t); return; }
      const match = members.find(m => m.name && m.name.toLowerCase() === t.toLowerCase());
      if (match) ids.push(match._id);
      else missing.push(t);
    });
    return { ids, missing };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name required");

    const parentsTokens = parseCsv(form.parentsCsv);
    const spousesTokens = parseCsv(form.spousesCsv);

    const { ids: parentIds, missing: missingParents } = resolveNamesToIds(parentsTokens);
    const { ids: spouseIds, missing: missingSpouses } = resolveNamesToIds(spousesTokens);

    if (missingParents.length || missingSpouses.length) {
      const msgs = [];
      if (missingParents.length) msgs.push(`Parents not found: ${missingParents.join(", ")}`);
      if (missingSpouses.length) msgs.push(`Spouses not found: ${missingSpouses.join(", ")}`);
      msgs.push("Tip: use exact name from members list or paste member id (24 hex chars).");
      return alert(msgs.join("\n"));
    }

    // if birthDate present, send as ISO date string. If blank, you may still send null if schema allows.
    const payload = {
      name: form.name,
      gender: form.gender,
      birthDate: form.birthDate || undefined,
      parents: parentIds,
      spouses: spouseIds,
      family: form.family || undefined
    };

    try {
      const { data } = await api.post("/members", payload);
      alert(`Member added: ${data.name || data._id}`);
      setForm({ name: "", gender: "other", birthDate: "", parentsCsv: "", spousesCsv: "", family: "" });
      onAdded && onAdded();
    } catch (err) {
      console.error("Add member error:", err);
      alert("Error adding member: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
        <option value="other">Other</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="date"
        placeholder="Birth date"
        value={form.birthDate}
        onChange={e => setForm({...form, birthDate: e.target.value})}
      />

      <input placeholder="Family ID or name (optional)" value={form.family} onChange={e => setForm({...form, family: e.target.value})} />

      <input placeholder="Parent names or IDs (comma-separated)" value={form.parentsCsv} onChange={e => setForm({...form, parentsCsv: e.target.value})} />
      <input placeholder="Spouse names or IDs (comma-separated)" value={form.spousesCsv} onChange={e => setForm({...form, spousesCsv: e.target.value})} />

      <button type="submit">Add Member</button>
    </form>
  );
}
