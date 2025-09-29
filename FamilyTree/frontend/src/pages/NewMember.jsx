import React from "react";
import MemberForm from "../components/MemberForm";

export default function NewMember() {
  function handleSubmit(data) {
    console.log("new member", data);
    alert("New member saved (demo)");
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-lg font-semibold mb-3">Add Member</h2>
      <MemberForm onSubmit={handleSubmit} />
    </div>
  );
}
