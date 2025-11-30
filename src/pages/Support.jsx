// src/pages/Support.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const FAQ_DATA = [
  {
    category: "general",
    question: "How does ProFinder work?",
    answer:
      "ProFinder connects users with verified local professionals. Users can register, search by skill and location, view professional details, book a service, and complete a demo payment. Admin verifies professionals before they appear to users.",
  },
  {
    category: "general",
    question: "Is this a real payment system?",
    answer:
      "This is a demo academic project. The payment flow is simulated for presentation purposes; no real money is transferred.",
  },
  {
    category: "technical",
    question: "I cannot login, what should I do?",
    answer:
      "Check if you selected the correct role (User / Professional / Admin) while logging in, and verify your email and password. If the problem continues, contact the admin team.",
  },
  {
    category: "technical",
    question: "My booking is not visible to admin.",
    answer:
      "Please ensure you completed the booking form and reached the payment success page. In our demo, bookings are stored locally and visible in the Admin Bookings section.",
  },
  {
    category: "feedback",
    question: "How can I suggest a new feature?",
    answer:
      "You can use the feedback form on the Contact page or talk to the project team directly. Suggestions like rating, live chat, or GPS tracking are part of our future scope.",
  },
  {
    category: "feedback",
    question: "Can professionals update their details later?",
    answer:
      "In our current version, professionals register once with details like Aadhaar, experience, skill and area. Profile editing can be added as a future enhancement.",
  },
];

export default function Support() {
  const { state } = useApp();
  const { theme } = state;

  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(null);

  const pageBase =
    theme === "dark"
      ? "text-slate-50"
      : "text-slate-900";

  const cardBase =
    theme === "dark"
      ? "bg-slate-900/80 border border-slate-700"
      : "bg-white border border-slate-200";

  const chipBase =
    "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition";

  const categories = [
    {
      id: "general",
      title: "General Questions",
      icon: "💬",
      description: "Basics about how ProFinder works and who can use it.",
    },
    {
      id: "technical",
      title: "Technical Issues",
      icon: "🛠️",
      description: "Login, booking problems, or any technical error.",
    },
    {
      id: "feedback",
      title: "Feedback & Improvements",
      icon: "✨",
      description: "Suggestions to improve features and UI/UX.",
    },
  ];

  const filteredFaq = FAQ_DATA.filter(
    (faq) => faq.category === activeCategory
  );

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`space-y-8 ${pageBase}`}>
      {/* HERO */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Support &amp; Help Center
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-300 max-w-2xl">
          Need help using ProFinder? Start with the sections below. We have
          grouped common questions into General, Technical, and Feedback
          categories for a smoother experience.
        </p>
      </section>

      {/* CATEGORY CARDS */}
      <section className="grid gap-4 md:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(null);
            }}
            className={`${cardBase} rounded-2xl p-4 text-left shadow-sm hover:shadow-lg transition hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{cat.icon}</span>
              <span
                className={`${chipBase} ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                {activeCategory === cat.id ? "Active" : "Explore"}
              </span>
            </div>
            <h2 className="text-sm font-semibold mb-1">{cat.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              {cat.description}
            </p>
          </button>
        ))}
      </section>

      {/* FAQ ACCORDION */}
      <section className={`${cardBase} rounded-2xl p-5 shadow-md space-y-3`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-semibold">
              {categories.find((c) => c.id === activeCategory)?.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              Click on a question to view the answer.
            </p>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {filteredFaq.length} questions
          </span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredFaq.map((faq, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full text-left py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-100">
                  {faq.question}
                </p>
                <span className="text-xs text-slate-400">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">
                  {faq.answer}
                </p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section
        className={`rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900"
            : "bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50"
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            Still need help or want to share feedback?
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-200 max-w-xl">
            You can reach out through the Contact page or talk to the project
            team directly during demo. We are happy to improve ProFinder based
            on your suggestions.
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/contact")}
          className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
        >
          Go to Contact Page
        </button>
      </section>
    </div>
  );
}
