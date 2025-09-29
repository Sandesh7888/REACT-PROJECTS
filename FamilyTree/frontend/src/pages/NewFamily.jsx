import React from "react";

export default function NewFamily() {
  function handle(e) {
    e.preventDefault();
    alert("Create family - wire to API");
  }
  return (
    <div className="max-w-xl">
      <form onSubmit={handle} className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-lg font-semibold">Create New Family</h2>
        <input
          placeholder="Family name"
          className="w-full p-2 rounded border"
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 rounded border"
        />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
