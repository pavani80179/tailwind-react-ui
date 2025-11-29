// src/hooks/useProfessionals.js
import { useEffect, useState } from "react";

export default function useProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your own service-style roles (like UrbanClap)
  const serviceRoles = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "House Cleaner",
    "Gardener",
    "Cook / Chef",
    "Home Tutor",
    "AC Technician",
    "Painter",
    "Driver",
    "Baby Sitter",
    "Nurse / Caretaker",
  ];

  const serviceCategories = [
    "Home Services",
    "Repairs",
    "Maintenance",
    "Cleaning",
    "Outdoor & Garden",
    "Food & Cooking",
    "Education",
    "Appliance Repair",
    "Painting & Renovation",
    "Transport",
    "Child Care",
    "Health & Elder Care",
  ];

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://dummyjson.com/users?limit=12");

        if (!res.ok) {
          throw new Error("Failed to fetch professionals");
        }

        const data = await res.json();

        setProfessionals(
          (data.users || []).map((user, index) => {
            const role = serviceRoles[index % serviceRoles.length];
            const category = serviceCategories[index % serviceCategories.length];

            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              phone: user.phone,
              city: user.address?.city || "Your City",
              role,       // 👈 our service job
              category,   // 👈 nice label like "Home Services"
              company: "Local Service Provider",
            };
          })
        );
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, []);

  return { professionals, loading, error };
}
