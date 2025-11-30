// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PaymentSuccess() {
  const { state } = useApp();
  const { theme } = state;

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const lastId = localStorage.getItem("lastPaidBookingId");
    if (!lastId) return;

    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const b = all.find((x) => String(x.id) === String(lastId));
    if (b) setBooking(b);
  }, []);

  const cardBase =
    theme === "dark"
      ? "bg-slate-800 text-slate-50 border border-slate-700"
      : "bg-white text-slate-900 border border-slate-200";

  return (
    <div className="flex justify-center">
      <div className={`${cardBase} rounded-2xl shadow-md p-6 w-full max-w-md text-center space-y-3`}>
        <div className="text-4xl">✅</div>
        <h1 className="text-xl font-bold">Payment Successful</h1>
        {booking ? (
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Thank you, <span className="font-semibold">{booking.customerName}</span>.
            Your booking with{" "}
            <span className="font-semibold">{booking.professionalName}</span> on{" "}
            <span className="font-semibold">{booking.date}</span> has been marked
            as <span className="font-semibold text-emerald-400">PAID</span>.
          </p>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Your payment was recorded. You can check bookings from the Admin
            panel (demo purpose).
          </p>
        )}

        <div className="flex justify-center gap-2 mt-3 text-xs">
          <Link
            to="/professional"
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Back to Professionals
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
