// src/pages/admin/ApproveProfessionals.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApproveProfessionals() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!current || current.role !== "admin") {
      navigate("/user");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const pros = users.filter((u) => u.role === "professional");
    setProfessionals(pros);
  }, [navigate]);

  const updateStatus = (email, status) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.map((u) =>
      u.email === email ? { ...u, status } : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
    setProfessionals(updated.filter((u) => u.role === "professional"));
  };

  const truncateAadhaar = (aadhaar = "") =>
    aadhaar.length >= 4 ? `XXXX‑XXXX‑${aadhaar.slice(-4)}` : aadhaar;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-2">Approve Professionals</h1>
        <p className="text-sm text-slate-500">
          Review details of registered professionals and approve or reject them.
        </p>
      </header>

      <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
        {professionals.length === 0 ? (
          <p className="text-sm text-slate-500">
            No professional registrations yet.
          </p>
        ) : (
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Skill</th>
                <th className="py-2 pr-3">Experience</th>
                <th className="py-2 pr-3">Area</th>
                <th className="py-2 pr-3">Gender</th>
                <th className="py-2 pr-3">Aadhaar</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map((p) => (
                <tr
                  key={p.email}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-2 pr-3">{p.name}</td>
                  <td className="py-2 pr-3">{p.email}</td>
                  <td className="py-2 pr-3">{p.skill}</td>
                  <td className="py-2 pr-3">
                    {p.experience ? `${p.experience} yrs` : "-"}
                  </td>
                  <td className="py-2 pr-3">{p.area}</td>
                  <td className="py-2 pr-3">{p.gender}</td>
                  <td className="py-2 pr-3">{truncateAadhaar(p.aadhaar)}</td>
                  <td className="py-2 pr-3">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] ${
                        p.status === "approved"
                          ? "bg-emerald-100 text-emerald-600"
                          : p.status === "rejected"
                          ? "bg-rose-100 text-rose-600"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.status || "pending"}
                    </span>
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateStatus(p.email, "approved")}
                        className="px-2 py-1 rounded-full bg-emerald-500 text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(p.email, "rejected")}
                        className="px-2 py-1 rounded-full bg-rose-500 text-white"
                      >
                        Reject
                      </button>
                    </div>
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
