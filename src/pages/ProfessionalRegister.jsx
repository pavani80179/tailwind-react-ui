// src/pages/ProfessionalRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfessionalRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    aadhaar: "",
    gender: "",
    experience: "",
    skill: "",
    area: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // very basic validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.aadhaar ||
      !form.gender ||
      !form.experience ||
      !form.skill ||
      !form.area
    ) {
      setMsg("⚠️ Please fill all required fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === form.email)) {
      setMsg("A user with this email already exists.");
      return;
    }

    const newPro = {
      ...form,
      role: "professional",
      status: "pending", // admin will approve
      createdAt: new Date().toISOString(),
    };

    users.push(newPro);
    localStorage.setItem("users", JSON.stringify(users));

    setMsg("✅ Registered successfully! Wait for admin approval.");
    setTimeout(() => {
      navigate("/user");
    }, 1200);
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "block text-xs mb-1 font-medium text-slate-600";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Professional Registration</h1>
        <p className="text-sm text-slate-500">
          Register as a service professional. Your profile will be reviewed by
          the admin before it becomes visible to users.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl p-6 shadow">
        {/* Basic details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Identity + gender */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              value={form.aadhaar}
              onChange={handleChange}
              className={inputClass}
              placeholder="1234‑5678‑9012"
              maxLength={12}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Experience + skill */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Experience (in years)</label>
            <input
              type="number"
              name="experience"
              min="0"
              value={form.experience}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g., 3"
              required
            />
          </div>
          <div>
            <label className={labelClass}>Primary Skill</label>
            <select
              name="skill"
              value={form.skill}
              onChange={handleChange}
              className={inputClass}
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
        </div>

        {/* Work area */}
        <div>
          <label className={labelClass}>Work Area / Address</label>
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., Kukatpally, Hyderabad"
            required
          />
        </div>

        {msg && <p className="text-xs text-emerald-600">{msg}</p>}

        <button
          type="submit"
          className="w-full mt-2 rounded-full bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700"
        >
          Submit for Approval
        </button>
      </form>
    </div>
  );
}
