import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

    const pageTest = {
  backgroundColor: '#7f10ee',
  border: '3px solid #fb11c0',
};

  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const showDashboardButton = location.pathname !== "/";

  if (!user) return null;

  return (
    <header style={pageTest}>
      <Link to="/">
        <h2>sub_script_</h2>
      </Link>

      <div>
        <span>Welcome, {user.username}</span>
        {showDashboardButton && (
          <Link to="/">
            <button>
              DASHBOARD
            </button>
          </Link>
        )}
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
