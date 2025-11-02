import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`p-10 text-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">📞 Contact Us</h1>
      <p className="text-lg mb-10 max-w-3xl mx-auto">
        Have questions, feedback, or need assistance?  
        Reach out to the ProFinder team — we’re here to help you 24/7!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } hover:scale-105 transform transition`}
        >
          <h2 className="text-xl font-semibold mb-2">📍 Address</h2>
          <p>123 Innovation Street, Tech City, India</p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } hover:scale-105 transform transition`}
        >
          <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
          <p>support@profinder.com</p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } hover:scale-105 transform transition`}
        >
          <h2 className="text-xl font-semibold mb-2">📞 Phone</h2>
          <p>+91 98765 43210</p>
        </div>
      </div>

      <div
        className={`mt-12 p-8 rounded-2xl shadow-lg max-w-xl mx-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md border border-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md border border-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="p-3 rounded-md border border-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
