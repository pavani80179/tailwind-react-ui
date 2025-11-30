// src/pages/About.jsx
import React from "react";

export default function About() {
  const cardBase =
    "rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg p-6";

  return (
    <div className="space-y-10 text-slate-100 fade-in">
      {/* HEADER */}
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          About ProFinder
        </h1>
        <p className="max-w-3xl text-sm md:text-base text-slate-300">
          ProFinder connects users with verified, skilled professionals for
          trusted home and daily‑service bookings. The goal of this project is
          to simulate a real‑world service platform with user, professional and
          admin flows – all built using modern frontend tools.
        </p>
      </section>

      {/* TECH + FEATURES */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Tech stack */}
        <div className={cardBase}>
          <h2 className="text-lg font-semibold mb-3">Technology Stack</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>⚡ React + Vite single‑page application</li>
            <li>🎨 Tailwind CSS for modern, responsive UI</li>
            <li>🧠 Context API for global state (theme & auth)</li>
            <li>💾 LocalStorage for demo data persistence</li>
            <li>🔐 Simple role‑based access (User / Professional / Admin)</li>
          </ul>
        </div>

        {/* Key features */}
        <div className={cardBase}>
          <h2 className="text-lg font-semibold mb-3">Key Features</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>🔎 Browse and search approved local professionals</li>
            <li>📅 Book a professional with date & requirement details</li>
            <li>💳 Demo payment flow after booking confirmation</li>
            <li>✅ Admin dashboard to approve / reject professionals</li>
            <li>🌗 Consistent dark themed UI with clear navigation</li>
          </ul>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Meet Our Team</h2>
        <p className="text-sm text-slate-300">
          This project was collaboratively built as part of our FEDF lab,
          showcasing frontend development, logic integration and testing.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Pavani */}
          <article className={cardBase + " flex flex-col items-center text-center"}>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-sm font-semibold mb-3">
              PS
            </div>
            <h3 className="font-semibold">Pavani Sri Charani</h3>
            <p className="text-xs text-sky-400 mb-2">Frontend & UI Design</p>
            <p className="text-xs text-slate-300">
              Designed the layouts, navigation, theme and visual elements for
              ProFinder. Focused on making the UI clean and user‑friendly.
            </p>
          </article>

          {/* Harshini */}
          <article className={cardBase + " flex flex-col items-center text-center"}>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-sm font-semibold mb-3">
              H
            </div>
            <h3 className="font-semibold">Harshini</h3>
            <p className="text-xs text-sky-400 mb-2">Logic & Integrations</p>
            <p className="text-xs text-slate-300">
              Implemented authentication flow, role handling, booking logic and
              localStorage integration for users and professionals.
            </p>
          </article>

          {/* Ujwala */}
          <article className={cardBase + " flex flex-col items-center text-center"}>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-sm font-semibold mb-3">
              U
            </div>
            <h3 className="font-semibold">Ujwala</h3>
            <p className="text-xs text-sky-400 mb-2">
              Testing & Documentation
            </p>
            <p className="text-xs text-slate-300">
              Tested user flows end‑to‑end and contributed to PPT, use‑case
              explanation and system documentation.
            </p>
          </article>
        </div>
      </section>

      {/* FUTURE ENHANCEMENTS */}
      <section className={cardBase}>
        <h2 className="text-lg font-semibold mb-3">Future Enhancements</h2>
        <p className="text-sm text-slate-300 mb-3">
          If ProFinder were extended beyond this lab project, we would like to
          add the following improvements:
        </p>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-300">
          <li>• Real payment gateway integration (Razorpay / Stripe)</li>
          <li>• Ratings and reviews for professionals</li>
          <li>• Live chat with professionals</li>
          <li>• Location‑based search & maps integration</li>
          <li>• Push notifications / email confirmations for bookings</li>
          <li>• Separate analytics dashboard for admin</li>
        </ul>
      </section>
    </div>
  );
}
