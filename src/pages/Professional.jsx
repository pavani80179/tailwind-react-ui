// src/pages/Professional.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import useProfessionals from "../hooks/useProfessionals";

export default function Professional() {
  const { state } = useApp();
  const { theme } = state;
  const navigate = useNavigate();

  // API professionals (demo data from hook)
  const { professionals: apiProfessionals, loading, error } = useProfessionals();

  const [search, setSearch] = useState("");
  const [localProfessionals, setLocalProfessionals] = useState([]);

  // booking modal state
  const [selectedPro, setSelectedPro] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    date: "",
    details: "",
  });
  const [bookingMsg, setBookingMsg] = useState("");

  // allow only logged‑in users + load approved professionals
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!current) {
      navigate("/user");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const approvedPros = users.filter(
      (u) => u.role === "professional" && u.status === "approved"
    );
    setLocalProfessionals(approvedPros);
  }, [navigate]);

  const term = search.toLowerCase();

  const filteredLocalPros = localProfessionals.filter((p) =>
    (p.name || "").toLowerCase().includes(term)
  );

  const filteredApiPros = apiProfessionals.filter((p) =>
    p.name.toLowerCase().includes(term)
  );

  // ---------- booking handlers ----------
  const openBooking = (pro) => {
    setSelectedPro(pro);
    setBookingMsg("");
    setBookingForm({
      name: "",
      phone: "",
      date: "",
      details: "",
    });
  };

  const closeBooking = () => {
    setSelectedPro(null);
    setBookingMsg("");
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
      setBookingMsg("⚠️ Please fill all required fields.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      customerName: bookingForm.name,
      customerPhone: bookingForm.phone,
      date: bookingForm.date,
      details: bookingForm.details,
      professionalEmail: selectedPro.email,
      professionalName: selectedPro.name || "Local Professional",
      createdAt: new Date().toISOString(),
      paid: false,
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    localStorage.setItem("lastPaidBookingId", String(newBooking.id));

    setBookingMsg("✅ Booking created! Redirecting to payment...");
    setTimeout(() => {
      closeBooking();
      navigate(`/payment/${newBooking.id}`);
    }, 900);
  };

  // ---------- style helpers ----------
  const cardBase =
    theme === "dark"
      ? "bg-slate-900/90 text-slate-50 border border-slate-700"
      : "bg-white text-slate-900 border border-slate-200";

  const pill =
    "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Find &amp; Book Professionals
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-300 max-w-2xl">
          Browse trusted, admin‑approved professionals for home and daily
          services. Search, book and complete a demo payment in a few steps.
        </p>
      </section>

      {/* SEARCH BAR */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by professional name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Local pros: {filteredLocalPros.length} • API pros:{" "}
          {filteredApiPros.length}
        </span>
      </section>

      {/* LOCAL PROFESSIONALS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold">
              Locally Approved Professionals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              Professionals registered through ProFinder and approved by the
              admin with Aadhaar, experience and work area details.
            </p>
          </div>
        </div>

        {filteredLocalPros.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-300">
            No approved professionals yet. Ask professionals to register and
            wait for admin approval.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLocalPros.map((pro) => {
              const initials =
                (pro.name || "P F")
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2) || "PF";

              return (
                <div
                  key={pro.email}
                  className={`${cardBase} rounded-2xl shadow-lg p-4 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-2xl transition-transform`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-sm font-semibold text-white shadow-md">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          {pro.name || "Local Professional"}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {pro.skill || "Home Service"} •{" "}
                          {pro.experience
                            ? `${pro.experience} yrs exp`
                            : "New"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`${pill} bg-emerald-500/10 text-emerald-400 border border-emerald-500/40`}
                    >
                      ✅ Approved
                    </span>
                  </div>

                 <div className="text-xs space-y-1 text-slate-500 dark:text-slate-300">
                    <p>📍 {pro.area || "Location not specified"}</p>
                    <p>✉️ {pro.email}</p>
                    <p>
                      💰 Avg charge:{" "}
                      {pro.avgCharge ? `₹${pro.avgCharge} per service` : "Not specified"}
                    </p>
                    <p>
                        🧾 Aadhaar (hidden): ****
                        {(pro.aadhaar || "").slice(-4)}
                    </p>
                  </div>


                  <button
                    onClick={() => openBooking(pro)}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 shadow-md"
                  >
                    📅 Book &amp; Pay
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* API PROFESSIONALS (demo list) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold">Service Professionals (API)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Public professionals fetched from an API for demo UI. These show how
            external data can be integrated into the platform.
          </p>
        </div>

        {loading && (
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Fetching professionals...
          </p>
        )}
        {error && (
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && filteredApiPros.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApiPros.map((pro) => (
              <div
                key={pro.id}
                className={`${cardBase} rounded-2xl shadow p-4 text-xs space-y-2`}
              >
                <h3 className="font-semibold text-sm">{pro.name}</h3>
                <p className="text-slate-400">{pro.role}</p>
                <p>📍 {pro.city}</p>
                <p>✉️ {pro.email}</p>
                <p>📞 {pro.phone}</p>
                <p className="text-[11px] text-slate-400">
                  Category: {pro.category || "Home Service"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BOOKING MODAL */}
      {selectedPro && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div
            className={`${cardBase} w-full max-w-md rounded-2xl shadow-2xl p-6 relative`}
          >
            <button
              onClick={closeBooking}
              className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-1">
              Book {selectedPro.name || "Professional"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300 mb-4">
              Enter your details and preferred date. After this step you will be
              redirected to a demo payment page.
            </p>

            <form className="space-y-3" onSubmit={handleBookingSubmit}>
              <div>
                <label className="block text-xs mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleBookingChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleBookingChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleBookingChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs mb-1">
                  Requirement Details (optional)
                </label>
                <textarea
                  name="details"
                  rows={3}
                  value={bookingForm.details}
                  onChange={handleBookingChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., 2BHK cleaning, kitchen sink leakage, daily cooking..."
                />
              </div>

              {bookingMsg && (
                <p className="text-xs text-emerald-400">{bookingMsg}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeBooking}
                  className="px-3 py-1 rounded-full text-xs text-slate-500 hover:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm &amp; Go to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
