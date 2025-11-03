import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 pt-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">About ProFinder</h1>

        {/* Description */}
        <p className="text-lg sm:text-xl leading-relaxed mb-6">
          ProFinder is a platform built to bridge the gap between clients and skilled professionals.
          Whether you need a web developer, designer, marketer, or consultant — we make it easy
          to connect, collaborate, and grow.
        </p>

        {/* Mission */}
        <p className="text-base sm:text-lg leading-relaxed mb-10">
          Our mission is to simplify freelancing by creating a trusted ecosystem where individuals
          and businesses can find the right talent at the right time. With a focus on transparency,
          quality, and innovation, we empower professionals to showcase their expertise while helping
          clients achieve their goals.
        </p>

        {/* Why Choose Box */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 sm:p-8 text-left mx-auto max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Why Choose ProFinder?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Verified professionals across multiple industries</li>
            <li>Secure project management and payment system</li>
            <li>Built-in communication and collaboration tools</li>
            <li>Transparent ratings and reviews</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
