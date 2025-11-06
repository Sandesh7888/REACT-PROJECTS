import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid gap-4">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">Welcome to Vanshval</h1>
        <p className="mt-2 text-slate-600">
          Create and visualize your family trees — secure and shareable.
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            to="/signup"
            className="px-4 py-2 bg-emerald-500 text-white rounded"
          >
            Get started
          </Link>
          <Link to="/login" className="px-4 py-2 border rounded">
            Login
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Demo content</h2>
        <p className="text-sm text-slate-500">
          Use the New Family button after login to create.
        </p>
      </div>
    </div>
  );
}
