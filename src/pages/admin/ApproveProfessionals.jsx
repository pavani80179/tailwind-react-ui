// src/pages/admin/ApproveProfessionals.jsx
import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

export default function ApproveProfessionals() {
  const { state } = useApp();
  const { theme } = state;

  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const pros = users.filter((u) => u.role === "professional");
    setProfessionals(pros);
  }, []);

  const updateProfessionalStatus = (email, newStatus) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.role === "professional" && u.email === email
        ? { ...u, status: newStatus }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setProfessionals(updatedUsers.filter((u) => u.role === "professional"));
  };

  const tableBase =
    theme === "dark"
      ? "bg-slate-800 text-slate-50"
      : "bg-white text-slate-900";

  const chipClass = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "approved") {
      return (
        base +
        " bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
      );
    }
    if (status === "pending") {
      return (
        base +
        " bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
      );
    }
    if (status === "rejected") {
      return (
        base +
        " bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
      );
    }
    return (
      base +
      " bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
    );
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-2">Approve Professionals</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Review newly registered professionals and update their approval status.
        </p>
      </header>

      <div className={`${tableBase} rounded-xl shadow p-4 overflow-x-auto`}>
        {professionals.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-300">
            No professional registrations yet.
          </p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Email</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map((pro) => (
                <tr
                  key={pro.email}
                  className="border-b border-slate-100 dark:border-slate-700/60"
                >
                  <td className="py-2 pr-4">{pro.name}</td>
                  <td className="py-2 pr-4">{pro.email}</td>
                  <td className="py-2 pr-4">
                    <span className={chipClass(pro.status || "pending")}>
                      {pro.status || "pending"}
                    </span>
                  </td>
                  <td className="py-2 pr-4 space-x-2">
                    <button
                      onClick={() =>
                        updateProfessionalStatus(pro.email, "approved")
                      }
                      className="px-3 py-1 text-xs rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateProfessionalStatus(pro.email, "rejected")
                      }
                      className="px-3 py-1 text-xs rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
