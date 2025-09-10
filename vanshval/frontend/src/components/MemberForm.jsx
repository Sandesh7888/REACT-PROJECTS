// src/components/MemberForm.jsx
import { useState, useEffect } from "react";
import api from "../api";

export default function MemberForm({ onMemberAdded }) {
  const [form, setForm] = useState({
    name: "",
    gender: "other",
    parentsCsv: "",
    spousesCsv: ""
  });

  const [members, setMembers] = useState([]);
  const [parentsSelected, setParentsSelected] = useState([]); // array of ids
  const [spousesSelected, setSpousesSelected] = useState([]); // array of ids
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const { data } = await api.get("/members");
        if (!mounted) return;
        setMembers(data || []);
      } catch (err) {
        console.error("Failed to load members", err);
        setMembers([]);
      } finally {
        if (mounted) setLoadingMembers(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prefer explicit selections; otherwise parse csv fields
    const parents = parentsSelected.length
      ? parentsSelected
      : (form.parentsCsv || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    const spouses = spousesSelected.length
      ? spousesSelected
      : (form.spousesCsv || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    const payload = {
      name: form.name.trim(),
      gender: form.gender || "other",
      parents,
      spouses
    };

    try {
      const { data } = await api.post("/members", payload);
      alert(`Member "${data.name}" added!`);
      // reset form
      setForm({ name: "", gender: "other", parentsCsv: "", spousesCsv: "" });
      setParentsSelected([]);
      setSpousesSelected([]);
      // let parent refresh lists / tree
      if (typeof onMemberAdded === "function") onMemberAdded();
      // refresh members list so new member is selectable immediately
      try {
        const res = await api.get("/members");
        setMembers(res.data || []);
      } catch (_) {}
    } catch (error) {
      console.error(error);
      alert("Error adding member: " + (error.response?.data?.message || error.message));
    }
  };

  function renderMembersOptions() {
    return members.map((m) => (
      <option key={m._id} value={m._id}>
        {m.name} — {String(m._id).slice(0, 8)}
      </option>
    ));
  }

  return (
    <form onSubmit={handleSubmit} className="member-form" style={{ gap: 8, display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <input
        style={{ minWidth: 200 }}
        type="text"
        placeholder="Member Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
        required
        aria-label="Gender"
      >
        <option value="other">Other / Prefer not to say</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* If members exist, show multi-selects; otherwise keep CSV inputs */}
      {loadingMembers ? (
        <div>Loading members…</div>
      ) : members.length ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 220 }}>
            <label style={{ fontSize: 12 }}>Parents (multi-select)</label>
            <select
              multiple
              size={3}
              value={parentsSelected}
              onChange={(e) =>
                setParentsSelected(Array.from(e.target.selectedOptions, (o) => o.value))
              }
            >
              {renderMembersOptions()}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", minWidth: 220 }}>
            <label style={{ fontSize: 12 }}>Spouses (multi-select)</label>
            <select
              multiple
              size={2}
              value={spousesSelected}
              onChange={(e) =>
                setSpousesSelected(Array.from(e.target.selectedOptions, (o) => o.value))
              }
            >
              {renderMembersOptions()}
            </select>
          </div>
        </>
      ) : (
        <>
          <input
            style={{ minWidth: 200 }}
            type="text"
            placeholder="Parent IDs (comma-separated)"
            value={form.parentsCsv}
            onChange={(e) => setForm({ ...form, parentsCsv: e.target.value })}
          />
          <input
            style={{ minWidth: 200 }}
            type="text"
            placeholder="Spouse IDs (comma-separated)"
            value={form.spousesCsv}
            onChange={(e) => setForm({ ...form, spousesCsv: e.target.value })}
          />
        </>
      )}

      <button type="submit" style={{ padding: "8px 12px" }}>
        Add Member
      </button>
    </form>
  );
}
