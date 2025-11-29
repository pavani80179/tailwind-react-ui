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

    // 🔐 ONLY admin allowed
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

  // …rest of dashboard JSX (cards, link to /admin/approve)…
}
