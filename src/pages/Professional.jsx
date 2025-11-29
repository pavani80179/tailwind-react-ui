// src/pages/Professional.jsx
import React, { useState } from "react";
import useProfessionals from "../hooks/useProfessionals";
import { useApp } from "../context/AppContext";

export default function Professional() {
  const { state } = useApp();
  const { theme } = state;

  const { professionals, loading, error } = useProfessionals();
  const [search, setSearch] = useState("");

  const pageTitleClasses =
    theme === "dark"
      ? "text-2xl font-bold mb-4 text-slate-50"
      : "text-2xl font-bold mb-4 text-slate-900";

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

  const filteredProfessionals = professionals.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.company.toLowerCase().includes(term) ||
      p.role.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={pageTitleClasses}>Find Professionals</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Hire trusted home service experts like electricians, plumbers, cooks,
          gardeners, tutors and more.
        </p>
      </div>

      {/* Search bar */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, city, role, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputClasses}
        />
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Showing {filteredProfessionals.length} of {professionals.length} professionals
        </span>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-300">
          Fetching professionals from API...
        </div>
      )}

      {error && (
        <div className="mt-8 text-center text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProfessionals.map((pro) => (
            <div
              key={pro.id}
              className={`${cardBase} rounded-xl shadow-md p-4 border border-slate-200/60 dark:border-slate-700/60 transition-transform hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-semibold text-base">{pro.name}</h2>
                <span className={badgeClasses}>{pro.category}</span>
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
              </div>
            </div>
          ))}

          {filteredProfessionals.length === 0 && (
            <div className="col-span-full text-center text-sm text-slate-500 dark:text-slate-300 mt-8">
              No professionals found for “{search}”.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
