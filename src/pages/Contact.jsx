// src/pages/Contact.jsx
import React from "react";
import { useApp } from "../context/AppContext";

export default function Contact() {
  const { state } = useApp();
  const { theme } = state;

  const cardBase =
    theme === "dark"
      ? "bg-slate-900/80 border border-slate-700"
      : "bg-white border border-slate-200";

  const inputBase =
    "w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 " +
    (theme === "dark"
      ? "border-slate-700 bg-slate-900 text-slate-50"
      : "border-slate-300 bg-white text-slate-900");

  const labelBase =
    "block text-xs mb-1 font-medium " +
    (theme === "dark" ? "text-slate-200" : "text-slate-700");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been recorded for demo purposes.");
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact &amp; Support</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300 max-w-2xl">
          Have questions about ProFinder, facing a technical issue, or want to
          share feedback? Reach out to us using the details below or submit the
          contact form. This is a demo academic project, so responses are
          simulated.
        </p>
      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr,1fr] items-start">
        {/* LEFT: FORM */}
        <div className={`${cardBase} rounded-2xl p-6 shadow-md space-y-4`}>
          <h2 className="text-base font-semibold mb-1">Send us a message</h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 mb-2">
            Fill in the details below. In a real system, this would be sent to
            the admin or support team for follow‑up.
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>Your Name</label>
                <input
                  type="text"
                  required
                  className={inputBase}
                  placeholder="e.g., Pavani"
                />
              </div>
              <div>
                <label className={labelBase}>Email</label>
                <input
                  type="email"
                  required
                  className={inputBase}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>Role</label>
                <select className={inputBase} required>
                  <option value="">Select your role</option>
                  <option value="user">User</option>
                  <option value="professional">Professional</option>
                  <option value="admin">Admin / Mentor</option>
                </select>
              </div>
              <div>
                <label className={labelBase}>Topic</label>
                <select className={inputBase} required>
                  <option value="">Select topic</option>
                  <option value="general">General Query</option>
                  <option value="technical">Technical Issue</option>
                  <option value="booking">Booking / Payment</option>
                  <option value="feedback">Feedback / Suggestion</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelBase}>Subject</label>
              <input
                type="text"
                required
                className={inputBase}
                placeholder="Short summary of your query"
              />
            </div>

            <div>
              <label className={labelBase}>Message</label>
              <textarea
                rows={4}
                required
                className={inputBase + " resize-none"}
                placeholder="Describe your issue or feedback in detail..."
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 shadow"
            >
              Submit Message
            </button>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Note: For this project demo, the form does not send real emails.
              It shows how a real contact module would look in production.
            </p>
          </form>
        </div>

        {/* RIGHT: INFO / CARDS */}
        <div className="space-y-4">
          {/* Contact Info Card */}
          <div className={`${cardBase} rounded-2xl p-5 shadow-md space-y-3`}>
            <h2 className="text-sm font-semibold">Project Contact Details</h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              You can imagine these as details of the project owner or support
              team in a real deployment.
            </p>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-200">
              <p>📧 Email: support@profinder-demo.in</p>
              <p>📞 Phone: +91‑98765 43210</p>
              <p>🏫 College: [Your College Name]</p>
              <p>👨‍🏫 Guide/Mentor: [Mentor Name]</p>
            </div>
          </div>

          {/* Location Card */}
          <div
            className={`${cardBase} rounded-2xl p-5 shadow-md space-y-3 text-xs`}
          >
            <h2 className="text-sm font-semibold">Service Coverage (Demo)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              In our demo, we mainly show professionals in selected areas. In a
              real app, this can be expanded with live maps and GPS.
            </p>
            <ul className="list-disc ml-4 space-y-1 text-slate-600 dark:text-slate-200">
              <li>Hyderabad – Kukatpally, Miyapur, Ameerpet</li>
              <li>Vijayawada – Benz Circle, Auto Nagar</li>
              <li>Other cities can be added dynamically</li>
            </ul>
          </div>

          {/* Quick Note Card */}
          <div
            className={`rounded-2xl px-4 py-3 text-xs ${
              theme === "dark"
                ? "bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-900"
                : "bg-gradient-to-r from-emerald-50 via-slate-50 to-blue-50"
            }`}
          >
            <h2 className="text-sm font-semibold mb-1">For Review / Viva</h2>
            <p className="text-xs text-slate-600 dark:text-slate-200">
              You can mention that the Contact module is designed to handle
              general support, technical issues, and feedback, and that it can
              be integrated with email or ticketing systems in future versions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
