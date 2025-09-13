import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link> | <Link to="/tree">Tree</Link>
        {user ? (
          <>
            {" | "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            {" | "}
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
