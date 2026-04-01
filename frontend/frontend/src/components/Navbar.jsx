import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <header>
      <Link to="/">
        <h2>sub_script_</h2>
      </Link>

      <div>
        <span>Welcome, {user.username}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
