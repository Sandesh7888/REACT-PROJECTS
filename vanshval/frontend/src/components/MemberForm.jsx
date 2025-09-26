import React, { useState, useEffect } from "react";
import api from "../api/index.js";

/**
 * Check if a string looks like a 24-character Mongo ObjectId.
 */
function looksLikeObjectId(val) {
  return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
}

export default function MemberForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    gender: "other",
    birthDate: "",
    parentsCsv: "",
    spousesCsv: "",
    family: ""
  });
  const [members, setMembers] = useState([]);

  // Load the current list of members once so we can resolve names → IDs.
  useEffect(() => {
    api
      .get("/members")
      .then((r) => setMembers(r.data || []))
      .catch(() => setMembers([]));
  }, []);

  /** Split a comma-separated string into trimmed tokens. */
  const parseCsv = (csv) =>
    csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  /**
   * Convert each token to an ObjectId.
   * Accepts either a valid 24-hex ID or a member name (case-insensitive).
   */
  const resolveNamesToIds = (tokens) => {
    const ids = [];
    const missing = [];
    tokens.forEach((t) => {
      if (looksLikeObjectId(t)) {
        ids.push(t);
        return;
      }
      const match = members.find(
        (m) => m.name && m.name.toLowerCase() === t.toLowerCase()
      );
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

    const { ids: parentIds, missing: missingParents } =
      resolveNamesToIds(parentsTokens);
    const { ids: spouseIds, missing: missingSpouses } =
      resolveNamesToIds(spousesTokens);

    // Warn if any names couldn’t be resolved
    if (missingParents.length || missingSpouses.length) {
      const msgs = [];
      if (missingParents.length)
        msgs.push(`Parents not found: ${missingParents.join(", ")}`);
      if (missingSpouses.length)
        msgs.push(`Spouses not found: ${missingSpouses.join(", ")}`);
      msgs.push(
        "Tip: use the exact member name (case-insensitive) or paste a 24-character ID."
      );
      return alert(msgs.join("\n"));
    }

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
      setForm({
        name: "",
        gender: "other",
        birthDate: "",
        parentsCsv: "",
        spousesCsv: "",
        family: ""
      });
      onAdded && onAdded(); // notify parent to refresh tree/list
    } catch (err) {
      console.error("Add member error:", err);
      alert(
        "Error adding member: " +
          (err.response?.data?.message || err.message)
      );
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

      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option value="other">Other</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="date"
        value={form.birthDate}
        onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
      />

      <input
        placeholder="Family ID or name (optional)"
        value={form.family}
        onChange={(e) => setForm({ ...form, family: e.target.value })}
      />

      <input
        placeholder="Parent names or IDs (comma-separated)"
        value={form.parentsCsv}
        onChange={(e) =>
          setForm({ ...form, parentsCsv: e.target.value })
        }
      />

      <input
        placeholder="Spouse names or IDs (comma-separated)"
        value={form.spousesCsv}
        onChange={(e) =>
          setForm({ ...form, spousesCsv: e.target.value })
        }
      />

      <button type="submit">Add Member</button>
    </form>
  );
}
