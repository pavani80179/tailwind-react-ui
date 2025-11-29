import { Link, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { state, dispatch } = useApp();
  const { theme } = state;

  const linkClass = ({ isActive }) =>
    "text-sm px-3 py-1" +
    (isActive
      ? " text-blue-400 font-semibold"
      : " text-slate-700 hover:text-blue-500");

  const headerClasses =
    theme === "dark"
      ? "bg-slate-950 border-b border-slate-800"
      : "bg-white shadow";

  return (
    <header className={headerClasses}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-blue-500">
          ProFinder
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/user" className={linkClass}>
            User
          </NavLink>
          <NavLink to="/professional" className={linkClass}>
            Professionals
          </NavLink>
          <NavLink to="/support" className={linkClass}>
            Support
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className="px-4 py-1 border rounded-lg text-sm hover:bg-slate-200 transition-colors"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </nav>
    </header>
  );
}
