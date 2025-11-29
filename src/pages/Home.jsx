// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const jobIcons = [
  { label: "Plumber", icon: "🔧", left: "8%", top: "18%" },
  { label: "Gardener", icon: "🌿", left: "82%", top: "22%" },
  { label: "Cook", icon: "👩‍🍳", left: "20%", top: "70%" },
  { label: "Carpenter", icon: "🪚", left: "72%", top: "72%" },
  { label: "Tutor", icon: "📚", left: "50%", top: "10%" },
  { label: "Driver", icon: "🚗", left: "12%", top: "48%" },
];

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-[85vh] w-full relative flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/webpagehome.jpg')" }}
      aria-label="Home background showing various professionals"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 pointer-events-none animated-gradient opacity-70" />

      {/* Dark dim / blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Floating job icons */}
      {jobIcons.map((j, i) => (
        <span
          key={j.label}
          aria-hidden="true"
          className="absolute z-10 text-2xl md:text-3xl drop-shadow-lg floating"
          style={{
            left: j.left,
            top: j.top,
            transform: `translate(-50%, -50%)`,
            animationDelay: `${i * 0.35}s`,
          }}
          title={j.label}
        >
          {j.icon}
        </span>
      ))}

      {/* Center content */}
      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl transition-all duration-900 ease-out ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ textShadow: "0 6px 30px rgba(0,0,0,0.8)" }}
        >
          <span className="block">Welcome to</span>
          <span className="block text-blue-400 mt-2">ProFinder</span>
        </h1>

        <p
          className={`mt-6 text-sm sm:text-base text-white/90 max-w-2xl mx-auto transition-opacity duration-900 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          Hire trusted local professionals — plumbers, gardeners, cooks, tutors and more.
        </p>

        {/* CTA */}
        <div className={`mt-8 ${show ? "opacity-100" : "opacity-0"}`}>
          <Link
            to="/professional"
            className="cta-btn"
            aria-label="Find professionals"
            role="button"
          >
            <span>🔎 Find Professionals</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
