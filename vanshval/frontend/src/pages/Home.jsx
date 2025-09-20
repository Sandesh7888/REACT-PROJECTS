import React from "react";
import MemberForm from "../components/MemberForm.jsx";
import MemberList from "../components/MemberList.jsx";

export default function Home() {
  return (
    <div className="container">
      <h1>Family Manager</h1>
      <MemberForm onAdded={() => window.location.reload()} />
      <MemberList />
    </div>
  );
}
