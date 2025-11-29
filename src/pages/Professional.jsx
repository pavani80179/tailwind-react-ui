// src/pages/Professional.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import useProfessionals from "../hooks/useProfessionals";

export default function Professional() {
  const { state } = useApp();
  const { theme } = state;
  const navigate = useNavigate();

  const { professionals: apiProfessionals, loading, error } = useProfessionals();
  const [search, setSearch] = useState("");
  const [localProfessionals, setLocalProfessionals] = useState([]);

  // 🔐 basic protection: only logged‑in professional or admin can access
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!current || (current.role !== "professional" && current.role !== "admin")) {
      // redirect others to login page
      navigate("/user");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const approvedPros = users.filter(
      (u) => u.role === "professional" && u.status === "approved"
    );
    setLocalProfessionals(approvedPros);
  }, [navigate]);

  const pageTitleClasses =
    theme === "dark"
      ? "text-2xl font-bold mb-2 text-slate-50"
      : "text-2xl font-bold mb-2 text-slate-900";

  const cardBase =
    theme === "dark"
      ? "bg-slate-800 text-slate-50"
      : "bg-white text-slate-900";

  const badgeClasses =
    theme === "dark"
      ? "inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-100"
      : "inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700";

  const inputClasses =
    theme === "dark"
      ? "w-full max-w-md px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      : "w-full max-w-md px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const sectionTitle =
    "text-base font-semibold mb-2 text-slate-800 dark:text-slate-100";

  const sectionSub =
    "text-xs text-slate-500 dark:text-slate-300 mb-4 max-w-2xl";

  const term = search.toLowerCase();

  const filteredApiPros = apiProfessionals.filter((p) => {
    return (
      p.name.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.company.toLowerCase().includes(term) ||
      p.role.toLowerCase().includes(term) ||
      (p.category && p.category.toLowerCase().includes(term))
    );
  });

  const filteredLocalPros = localProfessionals.filter((p) => {
    return (
      p.name?.toLowerCase().includes(term) ||
      p.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className={pageTitleClasses}>Find Professionals</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Browse trusted service providers for your home needs – electricians,
          plumbers, gardeners, cooks, tutors and more. Admin‑approved local
          professionals are highlighted separately.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, city, role, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputClasses}
        />
        <span className="text-xs text-slate-500 dark:text-slate-400">
          API Pros: {filteredApiPros.length} / {apiProfessionals.length}
          {localProfessionals.length > 0 && (
            <> • Local Approved: {filteredLocalPros.length}</>
          )}
        </span>
      </div>

      {/* LOADING / ERROR */}
      {loading && (
        <div className="mt-4 text-sm text-slate-500 dark:text-slate-300">
          Fetching professionals from API...
        </div>
      )}
      {error && (
        <div className="mt-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* LOCAL ADMIN‑APPROVED PROFESSIONALS SECTION */}
      <section className="space-y-3">
        <div>
          <h2 className={sectionTitle}>Locally Registered Professionals</h2>
          <p className={sectionSub}>
            These professionals registered through the app and were{" "}
            <span className="font-semibold text-emerald-500">
              approved by Admin
            </span>
            .
          </p>
        </div>

        {filteredLocalPros.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-300">
            No approved local professionals yet. Ask professionals to register
            via the User page and get approved from Admin.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLocalPros.map((pro) => (
              <div
                key={pro.email}
                className={`${cardBase} rounded-xl shadow-md p-4 border border-emerald-200/60 dark:border-emerald-700/50 transition-transform hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-semibold text-base">
                    {pro.name || "Local Professional"}
                  </h3>
                  <span className={`${badgeClasses} border border-emerald-500/40`}>
                    ✅ Approved by Admin
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-300 mb-3">
                  Registered through ProFinder platform
                </p>

                <div className="space-y-1 text-xs">
                  <p className="text-slate-600 dark:text-slate-200">
                    ✉️ {pro.email}
                  </p>
                  <p className="text-slate-500 dark:text-slate-300">
                    Role: Professional
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* API SERVICE PROFESSIONALS SECTION */}
      <section className="space-y-3">
        <div>
          <h2 className={sectionTitle}>Service Professionals (API)</h2>
          <p className={sectionSub}>
            Public service professionals fetched from API and mapped into roles
            like Electrician, Plumber, Cook, Gardener, Tutor etc. Useful for
            demo and UI.
          </p>
        </div>

        {!loading && !error && (
          <>
            {filteredApiPros.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-300">
                No professionals found for “{search}”.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredApiPros.map((pro) => (
                  <div
                    key={pro.id}
                    className={`${cardBase} rounded-xl shadow-md p-4 border border-slate-200/60 dark:border-slate-700/60 transition-transform hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-base">{pro.name}</h3>
                      <span className={badgeClasses}>
                        {pro.category || "Home Service"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                      {pro.role}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-3">
                      📍 {pro.city}
                    </p>

                    <div className="space-y-1 text-xs">
                      <p className="text-slate-600 dark:text-slate-200">
                        ✉️ {pro.email}
                      </p>
                      <p className="text-slate-600 dark:text-slate-200">
                        📞 {pro.phone}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Verified service listing (API demo).
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
