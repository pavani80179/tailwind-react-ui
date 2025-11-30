// src/pages/admin/SystemReports.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SystemReports() {
  const navigate = useNavigate();

  const [pendingPros, setPendingPros] = useState([]);
  const [approvedPros, setApprovedPros] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("verify"); // "verify" | "bookings"

  // ---- load data + protect route (only admin) ----
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!current || current.role !== "admin") {
      navigate("/user");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const allPros = users.filter((u) => u.role === "professional");

    setPendingPros(allPros.filter((p) => p.status !== "approved"));
    setApprovedPros(allPros.filter((p) => p.status === "approved"));

    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, [navigate]);

  const totalBookings = bookings.length;
  const paidCount = bookings.filter((b) => b.paid).length;
  const pendingBookingCount = totalBookings - paidCount;

  // ---- card style (matches your screenshot) ----
  const cardBase =
    "rounded-2xl bg-slate-900/90 border border-slate-700 shadow-lg";

  // ---- sync professionals back to localStorage when we approve / reject ----
  const syncProfessionals = (updatedPros) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const newUsers = users.map((u) => {
      if (u.role !== "professional") return u;
      const match = updatedPros.find((p) => p.email === u.email);
      return match || u;
    });

    localStorage.setItem("users", JSON.stringify(newUsers));

    const allPros = newUsers.filter((u) => u.role === "professional");
    setPendingPros(allPros.filter((p) => p.status !== "approved"));
    setApprovedPros(allPros.filter((p) => p.status === "approved"));
  };

  const handleApprove = (pro) => {
    const all = [...pendingPros, ...approvedPros].map((p) =>
      p.email === pro.email ? { ...p, status: "approved" } : p
    );
    syncProfessionals(all);
  };

  const handleReject = (pro) => {
    const all = [...pendingPros, ...approvedPros].map((p) =>
      p.email === pro.email ? { ...p, status: "rejected" } : p
    );
    syncProfessionals(all);
  };

  return (
    <div className="space-y-8 text-slate-100 fade-in">
      {/* HEADER */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Approve or reject professionals and view bookings created by users in
          ProFinder.
        </p>

        {/* TABS: Verify vs View Bookings */}
        <div className="inline-flex rounded-full bg-slate-900/80 border border-slate-700 p-1 text-xs">
          <button
            onClick={() => setActiveTab("verify")}
            className={`px-4 py-1 rounded-full transition ${
              activeTab === "verify"
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Verify Professionals
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-1 rounded-full transition ${
              activeTab === "bookings"
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            View Bookings
          </button>
        </div>
      </section>

      {/* =============== TAB 1: VERIFY PROFESSIONALS =============== */}
      {activeTab === "verify" && (
        <>
          {/* PENDING PROFESSIONALS */}
          <section className={`${cardBase} p-6 space-y-3`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Pending Professionals</h2>
              <span className="text-[11px] text-slate-300">
                {pendingPros.length} pending
              </span>
            </div>

            {pendingPros.length === 0 ? (
              <p className="text-xs text-slate-300">
                No pending professionals right now.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="text-[11px] text-left text-slate-200">
                    <tr className="border-b border-slate-700">
                      <th className="py-2 pr-3">Name</th>
                      <th className="py-2 pr-3">Email</th>
                      <th className="py-2 pr-3">Skill</th>
                      <th className="py-2 pr-3">Experience</th>
                      <th className="py-2 pr-3">Avg Charge</th>
                      <th className="py-2 pr-3">Area</th>
                      <th className="py-2 pr-3">Aadhaar</th>
                      <th className="py-2 pr-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-100">
                    {pendingPros.map((p) => (
                      <tr key={p.email}>
                        <td className="py-2 pr-3">{p.name}</td>
                        <td className="py-2 pr-3">{p.email}</td>
                        <td className="py-2 pr-3">{p.skill || "-"}</td>
                        <td className="py-2 pr-3">
                          {p.experience ? `${p.experience} yrs` : "-"}
                        </td>
                        <td className="py-2 pr-3">
                          {p.avgCharge ? `₹${p.avgCharge}` : "-"}
                        </td>
                        <td className="py-2 pr-3">{p.area || "-"}</td>
                        <td className="py-2 pr-3">
                          ****{(p.aadhaar || "").slice(-4)}
                        </td>
                        <td className="py-2 pr-3 space-x-1">
                          <button
                            onClick={() => handleApprove(p)}
                            className="px-2 py-1 rounded-full bg-emerald-500 text-white text-[11px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(p)}
                            className="px-2 py-1 rounded-full bg-rose-500 text-white text-[11px]"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* APPROVED PROFESSIONALS */}
          <section className={`${cardBase} p-6 space-y-3`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Approved Professionals</h2>
              <span className="text-[11px] text-slate-300">
                {approvedPros.length} approved
              </span>
            </div>

            {approvedPros.length === 0 ? (
              <p className="text-xs text-slate-300">
                No approved professionals yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="text-[11px] text-left text-slate-200">
                    <tr className="border-b border-slate-700">
                      <th className="py-2 pr-3">Name</th>
                      <th className="py-2 pr-3">Email</th>
                      <th className="py-2 pr-3">Skill</th>
                      <th className="py-2 pr-3">Experience</th>
                      <th className="py-2 pr-3">Avg Charge</th>
                      <th className="py-2 pr-3">Area</th>
                      <th className="py-2 pr-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-100">
                    {approvedPros.map((p) => (
                      <tr key={p.email}>
                        <td className="py-2 pr-3">{p.name}</td>
                        <td className="py-2 pr-3">{p.email}</td>
                        <td className="py-2 pr-3">{p.skill || "-"}</td>
                        <td className="py-2 pr-3">
                          {p.experience ? `${p.experience} yrs` : "-"}
                        </td>
                        <td className="py-2 pr-3">
                          {p.avgCharge ? `₹${p.avgCharge}` : "-"}
                        </td>
                        <td className="py-2 pr-3">{p.area || "-"}</td>
                        <td className="py-2 pr-3">
                          <span className="px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px]">
                            {p.status || "approved"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {/* =============== TAB 2: VIEW BOOKINGS =============== */}
      {activeTab === "bookings" && (
        <section className={`${cardBase} p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Bookings Overview</h2>
              <p className="text-xs text-slate-300 mt-1">
                Track which bookings are paid and which are still pending.
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-300 space-y-1">
              <p>Total: {totalBookings}</p>
              <p>Paid: {paidCount}</p>
              <p>Pending: {pendingBookingCount}</p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <p className="text-xs text-slate-300">
              No bookings yet. Once a user books a professional and completes
              the demo payment, it will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="text-[11px] text-left text-slate-200">
                  <tr className="border-b border-slate-700">
                    <th className="py-2 pr-3">Customer</th>
                    <th className="py-2 pr-3">Phone</th>
                    <th className="py-2 pr-3">Professional</th>
                    <th className="py-2 pr-3">Date</th>
                    <th className="py-2 pr-3">Details</th>
                    <th className="py-2 pr-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="py-2 pr-3">{b.customerName}</td>
                      <td className="py-2 pr-3">{b.customerPhone}</td>
                      <td className="py-2 pr-3">
                        {b.professionalName}{" "}
                        <span className="opacity-70">
                          ({b.professionalEmail})
                        </span>
                      </td>
                      <td className="py-2 pr-3">{b.date}</td>
                      <td className="py-2 pr-3 max-w-xs truncate">
                        {b.details || "-"}
                      </td>
                      <td className="py-2 pr-3">
                        <span
                          className={`px-2 py-1 rounded-full text-[11px] ${
                            b.paid
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-amber-500/15 text-amber-400"
                          }`}
                        >
                          {b.paid ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
