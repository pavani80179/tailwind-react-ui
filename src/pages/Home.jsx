import React from "react";
import { motion } from "framer-motion"; // optional for smooth animations

function Home() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center text-center px-6">
      
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4"
      >
        Welcome to <span className="text-blue-600">ProFinder</span> 🔍
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8"
      >
        Connect with top professionals for your projects — 
        fast, secure, and tailored to your needs. Hire the right people with confidence!
      </motion.p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        Get Started
      </motion.button>

      {/* Illustration or Feature Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Hire Experts</h3>
          <p className="text-gray-600">
            Choose from verified professionals across multiple industries and skill levels.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Post Your Projects</h3>
          <p className="text-gray-600">
            Describe your requirements, budget, and timeline — we’ll connect you instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Payments</h3>
          <p className="text-gray-600">
            Pay safely through our integrated system — ensuring both sides are protected.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
