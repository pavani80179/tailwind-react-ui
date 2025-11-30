// src/pages/Payment.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Payment() {
  const { state } = useApp();
  const { theme } = state;
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const b = all.find((x) => String(x.id) === String(id));
    if (!b) {
      setBooking(null);
    } else {
      setBooking(b);
    }
  }, [id]);

  const cardBase =
    theme === "dark"
      ? "bg-slate-800 text-slate-50 border border-slate-700"
      : "bg-white text-slate-900 border border-slate-200";

  const handlePay = () => {
    if (!booking) return;
    setProcessing(true);

    // simulate payment processing
    setTimeout(() => {
      const all = JSON.parse(localStorage.getItem("bookings") || "[]");
      const updated = all.map((b) =>
        String(b.id) === String(booking.id)
          ? {
              ...b,
              paid: true,
              paymentMethod: method,
              paidAt: new Date().toISOString(),
            }
          : b
      );
      localStorage.setItem("bookings", JSON.stringify(updated));
      localStorage.setItem("lastPaidBookingId", String(booking.id));
      setProcessing(false);
      navigate("/payment-success");
    }, 1000);
  };

  if (!booking) {
    return (
      <div className="text-sm text-slate-600 dark:text-slate-300">
        Booking not found. Please go back and create a booking again.
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className={`${cardBase} rounded-2xl shadow-md p-6 w-full max-w-md space-y-4`}>
        <h1 className="text-xl font-bold mb-1">Payment</h1>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          Complete the payment for your booking.
        </p>

        <div className="text-xs border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-1">
          <p>
            <span className="font-semibold">Customer:</span> {booking.customerName}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {booking.customerPhone}
          </p>
          <p>
            <span className="font-semibold">Professional:</span>{" "}
            {booking.professionalName}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {booking.date}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {booking.details || "-"}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold">Select Payment Method</p>
          <div className="flex gap-2 flex-wrap text-xs">
            <button
              type="button"
              onClick={() => setMethod("upi")}
              className={`px-3 py-1 rounded-full border text-xs ${
                method === "upi"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              UPI
            </button>
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`px-3 py-1 rounded-full border text-xs ${
                method === "card"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              Card
            </button>
            <button
              type="button"
              onClick={() => setMethod("cash")}
              className={`px-3 py-1 rounded-full border text-xs ${
                method === "cash"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              Cash on Service
            </button>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full mt-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>

        <p className="text-[11px] text-slate-400 mt-1">
          Note: This is a demo payment. No real money is transferred. Data is
          stored in localStorage for project demonstration.
        </p>
      </div>
    </div>
  );
}
