// src/pages/Home.jsx
import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      className="h-[85vh] w-full relative flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/webpagehome.jpg')",
      }}
    >
      {/* Dark overlay – adapts to light/dark mode */}
      <div className="absolute inset-0 bg-black/70 dark:bg-black/40 backdrop-blur-sm" />

      {/* YOUR LOGO – ONLY CHANGE THE src BELOW */}
      <img
        src="/images/webpagehome.jpg"          
        alt="ProFinder Logo"
        className="absolute z-10 w-auto h-auto max-w-[75%] max-h-[65%] object-contain drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-300"
      />

      {/* Welcome text */}
      <h1
        className={`relative z-20 text-5xl md:text-7xl lg:text-8xl font-extrabold text-white text-center transition-all duration-1000 ease-out drop-shadow-2xl ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
      >
        Welcome to <span className="text-blue-400 drop-shadow-lg">ProFinder</span>
      </h1>
    </div>
  );
}