import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  function submit(e) {
    e.preventDefault();
    nav("/login");
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Signup</h2>
        <input placeholder="Name" className="w-full p-2 rounded border" />
        <input placeholder="Email" className="w-full p-2 rounded border" />
        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 rounded border"
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-emerald-500 text-white"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
