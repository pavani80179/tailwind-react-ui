import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ProFinder</h1>
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/professional" className="hover:text-blue-600">Professional</Link>
          <Link to="/user" className="hover:text-blue-600">User</Link>
          <Link to="/admin" className="hover:text-blue-600">Admin</Link>
          <Link to="/support" className="hover:text-blue-600">Support</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
