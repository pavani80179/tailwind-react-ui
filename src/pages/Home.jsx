// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

function Home() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-md"
      >
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          Welcome to ProFinder
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Connecting users with trusted professionals effortlessly.  
          Find services, manage clients, and grow your business — all in one place.
        </p>
        <Link
          to="/professional"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
        >
          Explore Professionals
        </Link>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="py-20"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose ProFinder?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Verified Experts",
              desc: "All professionals are vetted to ensure top quality and trustworthiness.",
            },
            {
              title: "Smart Matching",
              desc: "Get matched with the right expert based on your needs and preferences.",
            },
            {
              title: "24/7 Support",
              desc: "Our support team is always here to help you resolve any issues quickly.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center py-16 bg-blue-600 dark:bg-blue-700 text-white rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Join ProFinder today and connect with the best professionals around you.
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all"
        >
          Contact Us
        </Link>
      </motion.section>
    </div>
  );
}

export default Home;
