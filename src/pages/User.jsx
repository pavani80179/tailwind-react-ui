// src/pages/User.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("register"); // "register" | "login"
  const [activeRole, setActiveRole] = useState("user"); // "user" | "professional" | "admin"

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    aadhaar: "",
    gender: "",
    experience: "",
    skill: "",
    area: "",
    avgCharge: "", // 💰 average amount per service
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // ---------- handlers ----------
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- REGISTER ----------
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setMessage("⚠️ Please fill name, email and password.");
      return;
    }

    if (users.find((u) => u.email === registerForm.email)) {
      setMessage("A user with this email already exists.");
      return;
    }

    let newUser;

    if (activeRole === "user") {
      // normal user
      newUser = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        role: "user",
        createdAt: new Date().toISOString(),
      };
    } else if (activeRole === "professional") {
      // professional – needs extra fields
      if (
        !registerForm.phone ||
        !registerForm.aadhaar ||
        !registerForm.gender ||
        !registerForm.experience ||
        !registerForm.skill ||
        !registerForm.area ||
        !registerForm.avgCharge
      ) {
        setMessage("⚠️ Please fill all professional details.");
        return;
      }

      newUser = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        phone: registerForm.phone,
        aadhaar: registerForm.aadhaar,
        gender: registerForm.gender,
        experience: registerForm.experience,
        skill: registerForm.skill,
        area: registerForm.area,
        avgCharge: registerForm.avgCharge, // 💰 saved here
        role: "professional",
        status: "pending", // admin will approve
        createdAt: new Date().toISOString(),
      };
    } else {
      // admin registration
      newUser = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        role: "admin",
        createdAt: new Date().toISOString(),
      };
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("✅ Registered successfully! You can login now.");
    setMode("login");
    setLoginForm({ email: registerForm.email, password: "" });
  };

  // ---------- LOGIN ----------
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        u.email === loginForm.email &&
        u.password === loginForm.password &&
        u.role === activeRole
    );

    if (!user) {
      setMessage("❌ Invalid credentials for selected role.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "professional") {
      navigate("/professional");
    } else {
      navigate("/");
    }
  };

  // ---------- UI helpers ----------
  const inputBase =
    "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelBase = "block text-xs mb-1 text-slate-200";

  const tabButton = (role, label) => (
    <button
      type="button"
      onClick={() => {
        setActiveRole(role);
        setMessage("");
      }}
      className={`flex-1 text-xs py-2 rounded-md border ${
        activeRole === role
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-slate-800 text-slate-200 border-slate-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-700 rounded-3xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Register / Login</h1>

        {/* mode switch */}
        <div className="flex mb-4 text-sm border border-slate-700 rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
            className={`flex-1 py-2 ${
              mode === "register"
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-300"
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
            className={`flex-1 py-2 ${
              mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-300"
            }`}
          >
            Login
          </button>
        </div>

        {/* role tabs */}
        <div className="flex gap-1 mb-6">
          {tabButton("user", "User")}
          {tabButton("professional", "Professional")}
          {tabButton("admin", "Admin")}
        </div>

        {/* REGISTER FORM */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-3">
            {/* common fields */}
            <div>
              <label className={labelBase}>Full name</label>
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                className={inputBase}
                required
              />
            </div>
            <div>
              <label className={labelBase}>Email</label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                className={inputBase}
                required
              />
            </div>
            <div>
              <label className={labelBase}>Password</label>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                className={inputBase}
                required
              />
            </div>

            {/* extra details only when Professional tab */}
            {activeRole === "professional" && (
              <>
                <div>
                  <label className={labelBase}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerForm.phone}
                    onChange={handleRegisterChange}
                    className={inputBase}
                    required
                  />
                </div>

                <div>
                  <label className={labelBase}>Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={registerForm.aadhaar}
                    onChange={handleRegisterChange}
                    maxLength={12}
                    className={inputBase}
                    placeholder="1234‑5678‑9012"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelBase}>Gender</label>
                    <select
                      name="gender"
                      value={registerForm.gender}
                      onChange={handleRegisterChange}
                      className={inputBase}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelBase}>Experience (years)</label>
                    <input
                      type="number"
                      name="experience"
                      min="0"
                      value={registerForm.experience}
                      onChange={handleRegisterChange}
                      className={inputBase}
                      placeholder="e.g., 3"
                      required
                    />
                  </div>
                </div>

                {/* 💰 Average charge field */}
                <div>
                  <label className={labelBase}>Average Charge (₹)</label>
                  <input
                    type="number"
                    name="avgCharge"
                    min="0"
                    value={registerForm.avgCharge}
                    onChange={handleRegisterChange}
                    className={inputBase}
                    placeholder="e.g., 500"
                    required
                  />
                </div>

                <div>
                  <label className={labelBase}>Primary Skill</label>
                  <select
                    name="skill"
                    value={registerForm.skill}
                    onChange={handleRegisterChange}
                    className={inputBase}
                    required
                  >
                    <option value="">Select skill</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Gardener">Gardener</option>
                    <option value="Cook / Chef">Cook / Chef</option>
                    <option value="Driver">Driver</option>
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Tutor">Tutor</option>
                    <option value="Tailor">Tailor</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Painter">Painter</option>
                  </select>
                </div>

                <div>
                  <label className={labelBase}>Work Area / Location</label>
                  <input
                    type="text"
                    name="area"
                    value={registerForm.area}
                    onChange={handleRegisterChange}
                    className={inputBase}
                    placeholder="e.g., Kukatpally, Hyderabad"
                    required
                  />
                </div>
              </>
            )}

            {message && (
              <p className="text-xs text-emerald-400 mt-1">{message}</p>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-full"
            >
              Register as{" "}
              {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
            </button>
          </form>
        )}

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className={labelBase}>Email</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className={inputBase}
                required
              />
            </div>
            <div>
              <label className={labelBase}>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className={inputBase}
                required
              />
            </div>

            {message && (
              <p className="text-xs text-rose-400 mt-1">{message}</p>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-full"
            >
              Login as{" "}
              {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
