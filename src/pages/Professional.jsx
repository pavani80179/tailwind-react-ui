import React from "react";
import { useTheme } from "../context/ThemeContext";

const professionals = [
  {
    name: "Ramesh Kumar",
    job: "Plumber",
    experience: "8 years",
    location: "Hyderabad",
    image:
      "https://cdn-icons-png.flaticon.com/512/809/809957.png",
    description:
      "Expert in repairing leaks, installing pipes, and maintaining bathroom fittings. Reliable and punctual.",
  },
  {
    name: "Sunita Devi",
    job: "Gardener",
    experience: "5 years",
    location: "Bengaluru",
    image:
      "https://cdn-icons-png.flaticon.com/512/765/765560.png",
    description:
      "Loves creating beautiful green spaces, trimming, planting, and maintaining gardens with care.",
  },
  {
    name: "Mohammed Irfan",
    job: "Carpenter",
    experience: "10 years",
    location: "Chennai",
    image:
      "https://cdn-icons-png.flaticon.com/512/679/679922.png",
    description:
      "Specialist in furniture repair, custom wooden interiors, and modular kitchen fitting.",
  },
  {
    name: "Priya Sharma",
    job: "Home Tutor",
    experience: "6 years",
    location: "Delhi",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135745.png",
    description:
      "Teaches Math and Science for classes 6–10 with a student-friendly and result-oriented approach.",
  },
  {
    name: "Arun Patel",
    job: "Electrician",
    experience: "7 years",
    location: "Mumbai",
    image:
      "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    description:
      "Handles wiring, lighting, inverter setup, and electrical safety checks efficiently.",
  },
  {
    name: "Lakshmi Bai",
    job: "Tailor",
    experience: "12 years",
    location: "Pune",
    image:
      "https://cdn-icons-png.flaticon.com/512/3941/3941224.png",
    description:
      "Skilled in women’s fashion stitching, alterations, and custom ethnic designs.",
  },
  {
    name: "Vijay Singh",
    job: "Painter",
    experience: "9 years",
    location: "Jaipur",
    image:
      "https://cdn-icons-png.flaticon.com/512/1545/1545085.png",
    description:
      "Professional house painter who ensures smooth finishes and timely completion of work.",
  },
  {
    name: "Kavitha ",
    job: "House Cleaner",
    experience: "4 years",
    location: "Visakhapatnam",
    image:
      "https://cdn-icons-png.flaticon.com/512/4021/4021733.png",
    description:
      "Provides deep cleaning services for homes, kitchens, and offices with top hygiene standards.",
  },
];

export default function Professional() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold text-center mb-10">
        🧰 Meet Our Professionals
      </h1>
      <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
        Explore skilled service providers near you — from plumbers and carpenters to home tutors
        and tailors. Each professional is verified and experienced in their craft.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {professionals.map((pro, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <img
              src={pro.image}
              alt={pro.name}
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{pro.name}</h2>
            <p className="text-center text-blue-500 font-medium">{pro.job}</p>
            <p className="text-center text-sm mt-2">{pro.location}</p>
            <p className="text-sm mt-3 text-center">{pro.description}</p>
            <p className="text-sm mt-3 text-center text-gray-400">
              Experience: {pro.experience}
            </p>
            <button
              className={`mt-4 w-full py-2 rounded-md font-medium ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              Connect Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
