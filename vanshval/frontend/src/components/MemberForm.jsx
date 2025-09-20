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
    parentsCsv: "",
    spousesCsv: "",
    family: ""
  });
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/members")
      .then((r) => {
        if (!mounted) return;
        setMembers(r.data || []);
      })
      .catch(() => setMembers([]))
      .finally(() => setLoadingMembers(false));
    return () => (mounted = false);
  }, []);

  const parseCsv = (csv) =>
    csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const resolveNamesToIds = (tokens) => {
    // returns { ids, missing } where missing are token strings not found
    const ids = [];
    const missing = [];
    tokens.forEach((t) => {
      if (looksLikeObjectId(t)) {
        ids.push(t);
        return;
      }
      // case-insensitive lookup by name
      const match = members.find((m) => m.name && m.name.toLowerCase() === t.toLowerCase());
      if (match) ids.push(match._id);
      else missing.push(t);
    });
    return { ids, missing };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name is required");

    // parse inputs
    const parentsTokens = parseCsv(form.parentsCsv);
    const spousesTokens = parseCsv(form.spousesCsv);

    // resolve
    const { ids: parentIds, missing: missingParents } = resolveNamesToIds(parentsTokens);
    const { ids: spouseIds, missing: missingSpouses } = resolveNamesToIds(spousesTokens);

    if (missingParents.length || missingSpouses.length) {
      const msgs = [];
      if (missingParents.length) msgs.push(`Parents not found: ${missingParents.join(", ")}`);
      if (missingSpouses.length) msgs.push(`Spouses not found: ${missingSpouses.join(", ")}`);
      msgs.push("Tip: enter exact name shown in members list, or pass the member's id (24 hex chars).");
      return alert(msgs.join("\n"));
    }

    const payload = {
      name: form.name,
      gender: form.gender,
      parents: parentIds,
      spouses: spouseIds,
      family: form.family || undefined
    };

    try {
      console.log("DEBUG token:", localStorage.getItem("token"));
      const { data } = await api.post("/members", payload);
      alert(`Member added: ${data.name || data._id}`);
      setForm({ name: "", gender: "other", parentsCsv: "", spousesCsv: "", family: "" });
      onAdded && onAdded();
    } catch (err) {
      console.error("Add member error:", err);
      alert("Error adding member: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
        <option value="other">Other</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        placeholder="Family ID (optional)"
        value={form.family}
        onChange={(e) => setForm({ ...form, family: e.target.value })}
      />

      <input
        placeholder="Parent names or IDs (comma-separated) e.g. Dagadu, 64f8a..."
        value={form.parentsCsv}
        onChange={(e) => setForm({ ...form, parentsCsv: e.target.value })}
      />
      <input
        placeholder="Spouse names or IDs (comma-separated)"
        value={form.spousesCsv}
        onChange={(e) => setForm({ ...form, spousesCsv: e.target.value })}
      />

      <div style={{ fontSize: 12, color: "#666", margin: "6px 0" }}>
        {loadingMembers ? "Loading members..." : (
          <span>
            Members loaded: {members.length}. Use exact name (case-insensitive) or id. Example: <strong>{members.slice(0,3).map(m=>m.name+" ("+m._id.slice(0,6)+")").join(", ")}</strong>
          </span>
        )}
      </div>

      <button type="submit">Add Member</button>
    </form>
  );
}
