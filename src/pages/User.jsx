import React from "react";

const users = [
  {
    name: "seetha",
    email: "seetha.r@example.com",
    role: "Designer",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Johny",
    email: "johny.mr@example.com",
    role: "Developer",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "leela",
    email: "leela.h@example.com",
    role: "Content Writer",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  },
];

const User = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        User Dashboard
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        View all registered users, their details, and account activity in one
        place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {user.name}
              </h2>
              <p className="text-blue-600 dark:text-blue-400">{user.role}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {user.email}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === "Active"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
