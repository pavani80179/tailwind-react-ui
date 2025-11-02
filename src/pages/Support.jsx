import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Support() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`p-10 text-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">💬 Support Center</h1>
      <p className="text-lg mb-10 max-w-3xl mx-auto">
        Need help navigating ProFinder?  
        Our support center provides answers, guidance, and live assistance to keep you moving forward.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } hover:scale-105 transform transition`}
        >
          <h2 className="text-xl font-semibold mb-2">📚 Help Articles</h2>
          <p>Browse detailed guides and FAQs to learn how to use ProFinder effectively.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Read Articles
          </button>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } hover:scale-105 transform transition`}
        >
          <h2 className="text-xl font-semibold mb-2">👩‍💻 Live Chat</h2>
          <p>Chat with our support team instantly for quick help and troubleshooting.</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Start Chat
          </button>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } hover:scale-105 transform transition`}
        >
          <h2 className="text-xl font-semibold mb-2">📩 Submit Ticket</h2>
          <p>Facing an issue? Submit a ticket and our experts will get back within 24 hours.</p>
          <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
