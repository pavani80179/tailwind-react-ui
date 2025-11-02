import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // ✅ Correct import

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 flex justify-between items-center shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold">ProFinder</h1>
      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/professional">Professional</Link>
        <Link to="/support">Support</Link>
        <Link to="/user">User</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 border rounded-md hover:bg-blue-500 hover:text-white"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
