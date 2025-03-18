import React from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  return (
    <nav className="topnav">
      <div className="Logo">
        <img src="/logo.webp" alt="Logo" />
      </div>
      <div className="List">
        {user ? (
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `${isActive ? "active" : ""}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => `${isActive ? "active" : ""}`}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reward"
                className={({ isActive }) => `${isActive ? "active" : ""}`}
              >
                Reward
              </NavLink>
            </li>
            <li>
              <a onClick={logoutUser}>Logout</a>
            </li>
          </ul>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
