import React, { useState } from "react";
import api from "../api/index.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      alert("Registered! Please login.");
      nav("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:420 }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
