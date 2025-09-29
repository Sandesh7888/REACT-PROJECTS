import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1
        className="font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Family Tree
      </h1>
      <nav>
        <button
          className="px-3 py-1 bg-white text-blue-600 rounded"
          onClick={() => navigate("/members")}
        >
          Members
        </button>
      </nav>
    </header>
  );
}
