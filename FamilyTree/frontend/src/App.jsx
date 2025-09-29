import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import TreeView from "./pages/TreeView.jsx";
import MemberList from "./pages/MemberList.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<TreeView />} />
          <Route path="/members" element={<MemberList />} />
        </Routes>
      </main>
    </div>
  );
}
