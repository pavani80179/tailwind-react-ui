import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

function About() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } p-6 rounded-2xl shadow-md`}
    >
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg leading-relaxed">
        Welcome to <strong>ProFinder</strong> — a platform designed to connect
        users with skilled professionals quickly and easily. We aim to make
        finding the right service as seamless as possible.
      </p>
      <p className="mt-4">
        Our mission is to build trust and convenience through technology,
        ensuring that every connection benefits both customers and experts.
      </p>
    </div>
  );
}

export default About;
