// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { state, dispatch } = useApp();
  const { theme } = state;
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(stored || null);
  }, []);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/user");
  };

  const navLinkBase =
    "text-sm font-medium px-3 py-2 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800/80";
  const activeClasses = "text-blue-600 dark:text-blue-400";

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b
        ${
          theme === "dark"
            ? "bg-slate-950/90 text-slate-50 border-slate-800 shadow-[0_2px_12px_rgba(15,23,42,0.7)]"
            : "bg-white/90 text-slate-900 border-slate-200 shadow-[0_2px_10px_rgba(15,23,42,0.15)]"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <button
          onClick={() => navigate("/")}
          className="text-xl font-extrabold tracking-tight flex items-center gap-1"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-sm shadow-md">
            PF
          </span>
          <span>ProFinder</span>
        </button>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            User
          </NavLink>
          <NavLink
            to="/professional"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            Professionals
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            Support
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClasses : ""}`
            }
          >
            Admin
          </NavLink>
        </div>

        {/* Right side: theme toggle + user info + logout */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium
              border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>

          {/* Current user + logout */}
          {currentUser && (
            <>
              <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-300 max-w-[160px] truncate">
                {currentUser.role === "admin"
                  ? "Admin"
                  : currentUser.role === "professional"
                  ? "Professional"
                  : "User"}
                {currentUser.name ? ` • ${currentUser.name}` : ""}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-xs font-medium border border-rose-400 text-rose-600 hover:bg-rose-50 dark:border-rose-500 dark:text-rose-200 dark:hover:bg-rose-900/40"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Spacer so content isn't hidden behind fixed navbar */}
      <div className="h-[1px]" />
    </nav>
  );
}
