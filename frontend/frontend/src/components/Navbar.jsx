import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/image (2).png";

const Navbar = () => {
  const logoStyle = {
    height: "190px",
    width: "auto",
    display: "block",
    borderRadius: "10px"
  };

  const navStyle = {
    backgroundColor: "#205992",
    borderBottom: "3px solid #008080",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    color: "white",
    minHeight: "60px",
  };

  const sectionStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
  };


  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const showDashboardButton = location.pathname !== "/";

  if (!user) return null;

  return (
    <header style={navStyle}>
      <div style={sectionStyle}>
        <Link to="/">
          <img src={logo} alt="yt_subscript logo" style={logoStyle} />
        </Link>
      </div>

      <div>
        <span>Welcome, {user.username}</span>
        {showDashboardButton && (
          <Link to="/">
            <button>DASHBOARD</button>
          </Link>
        )}
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
