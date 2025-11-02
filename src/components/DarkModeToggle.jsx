import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:scale-105 transition"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
