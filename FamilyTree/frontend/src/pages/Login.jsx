import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login({ name: "Demo User", email: "demo@example.com" });
    nav("/");
  }

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
}
