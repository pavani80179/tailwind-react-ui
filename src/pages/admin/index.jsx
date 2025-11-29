// src/pages/admin/index.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { state } = useApp();
  const { theme } = state;
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfessionals: 0,
    pendingProfessionals: 0,
    approvedProfessionals: 0,
  });

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");

    // 🔐 block non‑admins from opening /admin directly
    if (!current || current.role !== "admin") {
      navigate("/user");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const professionals = users.filter((u) => u.role === "professional");

    setStats({
      totalUsers: users.length,
      totalProfessionals: professionals.length,
      pendingProfessionals: professionals.filter(
        (p) => p.status === "pending"
      ).length,
      approvedProfessionals: professionals.filter(
        (p) => p.status === "approved"
      ).length,
    });
  }, [navigate]);

  const cardBase =
    theme === "dark"
      ? "bg-slate-800 text-slate-50"
      : "bg-white text-slate-900";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Monitor users and manage professional approvals.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${cardBase} rounded-xl shadow p-4`}>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Total Registered Accounts
          </p>
          <p className="text-2xl font-semibold mt-1">{stats.totalUsers}</p>
        </div>

        <div className={`${cardBase} rounded-xl shadow p-4`}>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Total Professionals
          </p>
          <p className="text-2xl font-semibold mt-1">
            {stats.totalProfessionals}
          </p>
        </div>

        <div className={`${cardBase} rounded-xl shadow p-4`}>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Pending Approvals
          </p>
          <p className="text-2xl font-semibold mt-1 text-amber-400">
            {stats.pendingProfessionals}
          </p>
        </div>

        <div className={`${cardBase} rounded-xl shadow p-4`}>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Approved Professionals
          </p>
          <p className="text-2xl font-semibold mt-1 text-emerald-400">
            {stats.approvedProfessionals}
          </p>
        </div>
      </section>

      <section
        className={`${cardBase} rounded-xl shadow p-4 flex items-center justify-between`}
      >
        <div>
          <h2 className="font-semibold mb-1">Manage Professionals</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Review and approve new professional registrations.
          </p>
        </div>
        <Link
          to="/admin/approve"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Approvals
        </Link>
      </section>
    </div>
  );
}
