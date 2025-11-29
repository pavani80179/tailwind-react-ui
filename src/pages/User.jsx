// src/pages/User.jsx
import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function User() {
  const { state } = useApp();
  const { theme } = state;

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
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
      setMessage("❌ User already registered with this email for this role.");
      return;
    }

    // 👉 KEY CHANGE: professionals start as PENDING, users as APPROVED
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
        ? "✅ Registration successful! Waiting for admin approval."
        : "✅ Registration successful! Please login."
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
      setMessage("❌ Invalid credentials or role.");
      return;
    }

    if (user.role === "professional" && user.status !== "approved") {
      setMessage("⏳ Your professional account is not approved yet by admin.");
      return;
    }

    setMessage(`✅ Welcome back, ${user.name}!`);
    // (Optional: here you can navigate based on role later)
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
          {isLogin ? "User Login" : "User / Professional Registration"}
        </h1>

        {/* Role Selection */}
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
            className={`px-4 py-2 rounded-r-lg border text-sm ${
              role === "professional"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            Professional
          </button>
        </div>

        {/* Input Fields */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
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

        {/* Submit Button */}
        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle Login/Register */}
        <p className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </p>

        {/* Status Message */}
        {message && (
          <div className="mt-4 text-center text-sm font-semibold text-blue-300">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
