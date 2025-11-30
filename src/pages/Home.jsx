// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      {/* Optional soft gradient overlay */}
      <div className="absolute inset-0 pointer-events-none animated-gradient opacity-60" />

      {/* Dark overlay (no blur now, so image is sharp) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center animated welcome text */}
      <div className="relative z-20 flex flex-col items-center px-4 text-center">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white transition-all duration-900 ease-out drop-shadow-2xl ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ textShadow: "0 6px 30px rgba(0,0,0,0.8)" }}
        >
          <span className="block">Welcome to</span>
          <span className="block text-blue-400 mt-2">ProFinder</span>
        </h1>

        <p
          className={`mt-6 text-sm sm:text-base text-white/90 max-w-2xl transition-opacity duration-900 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          Hire trusted local professionals — plumbers, gardeners, cooks, tutors
          and more.
        </p>

        {/* CTA button */}
        <div
          className={`mt-8 transition-all duration-900 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link to="/professional" className="cta-btn">
            <span role="img" aria-hidden="true">
              🔍
            </span>
            <span>Find Professionals</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
