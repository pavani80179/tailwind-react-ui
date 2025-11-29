// src/pages/User.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function User() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { theme } = state;

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user"); // "user" | "professional" | "admin"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Ensure users array exists (and optional admin seeding)
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // OPTIONAL: uncomment once if you want a default admin account:
    // if (!users.find((u) => u.role === "admin")) {
    //   users.push({
    //     name: "Admin",
    //     email: "admin@local",
    //     password: "admin",
    //     role: "admin",
    //     status: "approved",
    //     createdAt: new Date().toISOString(),
    //   });
    // }

    localStorage.setItem("users", JSON.stringify(users));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.email === formData.email && u.role === role
    );

    if (existingUser) {
      setMessage("❌ User already registered with this email and role.");
      return;
    }

    // Professionals require approval → start as pending
    const newUser = {
      ...formData,
      role,
      status: role === "professional" ? "pending" : "approved",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage(
      role === "professional"
        ? "✅ Registered as Professional. Waiting for admin approval."
        : "✅ Registered successfully! You can now login."
    );

    setFormData({ name: "", email: "", password: "" });
    setIsLogin(true);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password &&
        u.role === role
    );

    if (!user) {
      setMessage("❌ Invalid credentials or wrong role selected.");
      return;
    }

    if (user.role === "professional" && user.status !== "approved") {
      setMessage("⏳ Your professional account is not approved yet by admin.");
      return;
    }

    // 🔐 Save logged‑in user globally for route protection
    localStorage.setItem("currentUser", JSON.stringify(user));

    setMessage(`✅ Welcome back, ${user.name}!`);

    // Role‑based navigation
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "professional") {
      navigate("/professional");
    } else {
      navigate("/"); // normal user → homepage
    }
  };

  const cardClasses =
    theme === "dark"
      ? "bg-slate-800 text-slate-50"
      : "bg-white text-slate-900";

  const inputClasses =
    theme === "dark"
      ? "w-full p-2 mb-3 border rounded-lg bg-slate-700 text-white"
      : "w-full p-2 mb-3 border rounded-lg bg-white text-slate-900";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div
        className={`${cardClasses} shadow-2xl rounded-2xl p-8 w-full max-w-md transition-colors`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        {/* Role selection */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-l-lg border text-sm ${
              role === "user"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("professional")}
            className={`px-4 py-2 border text-sm ${
              role === "professional"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            Professional
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-r-lg border text-sm ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form fields */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`${inputClasses} mb-4`}
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>

        {message && (
          <div className="mt-4 text-center text-sm font-semibold text-blue-300">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
