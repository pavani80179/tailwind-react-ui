// src/pages/admin/Bookings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function AdminBookings() {
  const { state } = useApp();
  const { theme } = state;
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!current || current.role !== "admin") {
      navigate("/user");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    // latest first
    setBookings(stored.sort((a, b) => (b.createdAt || 0) > (a.createdAt || 0) ? 1 : -1));
  }, [navigate]);

  const cardBase =
    theme === "dark"
      ? "bg-slate-800 text-slate-50 border border-slate-700"
      : "bg-white text-slate-900 border border-slate-200";

  const clearAll = () => {
    localStorage.removeItem("bookings");
    setBookings([]);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-2">Customer Bookings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          These bookings are created when users send a request from the
          Professionals page. Data is stored in browser localStorage for
          demonstration purposes.
        </p>
      </header>

      <div className={`${cardBase} rounded-2xl p-4 shadow-md overflow-x-auto`}>
        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-300">
            No bookings yet. Ask a user to open the Professionals page and send a
            booking request.
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Total bookings: {bookings.length}
              </p>
              <button
                onClick={clearAll}
                className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs hover:bg-rose-700"
              >
                Clear all (demo)
              </button>
            </div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-3">Customer</th>
                  <th className="text-left py-2 pr-3">Phone</th>
                  <th className="text-left py-2 pr-3">Preferred Date</th>
                  <th className="text-left py-2 pr-3">Professional</th>
                  <th className="text-left py-2 pr-3">Details</th>
                  <th className="text-left py-2 pr-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-slate-100 dark:border-slate-700/60"
                  >
                    <td className="py-2 pr-3">{b.customerName}</td>
                    <td className="py-2 pr-3">{b.customerPhone}</td>
                    <td className="py-2 pr-3">{b.date}</td>
                    <td className="py-2 pr-3">
                      <div className="flex flex-col">
                        <span>{b.professionalName}</span>
                        <span className="text-[10px] text-slate-400">
                          {b.professionalEmail}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-3 max-w-xs">
                      <span className="line-clamp-3 whitespace-pre-wrap">
                        {b.details || "-"}
                      </span>
                    </td>
                    <td className="py-2 pr-3">
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
