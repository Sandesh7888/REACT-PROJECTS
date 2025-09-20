import React, { useState, useEffect } from "react";
import api from "../api/index.js";
import "../styles/MemberForm.css";


export default function MemberForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    gender: "male",
    dob: "",
    dod: "",
    info: "",
    parents: [],
    spouses: [],
    family: ""
  });

  const [members, setMembers] = useState([]);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    api.get("/members").then(r => setMembers(r.data)).catch(()=>setMembers([]));
    api.get("/families").then(r => setFamilies(r.data)).catch(()=>setFamilies([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/members", form);
      alert(`Member added: ${data.name}`);
      setForm({
        name: "",
        gender: "male",
        dob: "",
        dod: "",
        info: "",
        parents: [],
        spouses: [],
        family: ""
      });
      onAdded && onAdded();
    } catch (err) {
      alert("Error adding member: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>Family Manager</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />

      <select
        value={form.gender}
        onChange={e => setForm({ ...form, gender: e.target.value })}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <div className="member-form-dates">
        <input
          type="date"
          value={form.dob}
          onChange={e => setForm({ ...form, dob: e.target.value })}
          placeholder="DOB"
        />
        <input
          type="date"
          value={form.dod}
          onChange={e => setForm({ ...form, dod: e.target.value })}
          placeholder="Date of Death"
        />
      </div>

      <input
        placeholder="Info / Notes"
        value={form.info}
        onChange={e => setForm({ ...form, info: e.target.value })}
      />

      <select
        value={form.family}
        onChange={e => setForm({ ...form, family: e.target.value })}
      >
        <option value="">— Select Family —</option>
        {families.map(f => (
          <option key={f._id} value={f._id}>
            {f.name} ({f._id})
          </option>
        ))}
      </select>

      <label>Parents</label>
      <select
        multiple
        value={form.parents}
        onChange={e =>
          setForm({
            ...form,
            parents: Array.from(e.target.selectedOptions, o => o.value)
          })
        }
      >
        {members.map(m => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      <label>Spouses</label>
      <select
        multiple
        value={form.spouses}
        onChange={e =>
          setForm({
            ...form,
            spouses: Array.from(e.target.selectedOptions, o => o.value)
          })
        }
      >
        {members.map(m => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Member</button>
    </form>
  );
}
