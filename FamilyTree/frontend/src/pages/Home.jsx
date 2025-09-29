import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div>
        <Link
          to="/tree"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Family Tree
        </Link>
      </div>
    </div>
  );
}
