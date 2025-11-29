// src/pages/Home.jsx
import { useEffect, useState } from "react";

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
      style={{
        backgroundImage: "url('/images/webpagehome.jpg')",
      }}
      aria-label="Home background showing various professionals"
    >
      {/* Animated gradient overlay (soft) */}
      <div className="absolute inset-0 pointer-events-none animated-gradient opacity-70" />

      {/* Dark dim / blur overlay so text reads well in both themes */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Floating job icons */}
      {jobIcons.map((j, i) => (
        <span
          key={j.label}
          aria-hidden="true"
          className={`absolute z-10 text-2xl md:text-3xl drop-shadow-lg floating`}
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

      {/* Center animated welcome text */}
      <h1
        className={`relative z-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center transition-all duration-900 ease-out drop-shadow-2xl px-4 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ textShadow: "0 6px 30px rgba(0,0,0,0.8)" }}
      >
        <span className="block">Welcome to</span>
        <span className="block text-blue-400 mt-2">ProFinder</span>
      </h1>

      {/* small subtitle */}
      <p
        className={`relative z-20 mt-6 text-sm sm:text-base text-white/90 text-center max-w-2xl transition-opacity duration-900 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        Hire trusted local professionals — plumbers, gardeners, cooks, tutors and more.
      </p>
    </div>
  );
}
