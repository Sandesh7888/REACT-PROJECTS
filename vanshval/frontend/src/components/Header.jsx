import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <header className="header">
      <div>
        <strong>🌳 Vanshval</strong>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tree">Tree</Link>
        <Link to="/new">Add</Link>
        {user ? (
          <>
            <span style={{ marginLeft: 8 }}>{user.name}</span>
            <button onClick={doLogout} style={{ marginLeft: 8 }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
