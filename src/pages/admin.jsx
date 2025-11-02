import React from "react";

const tasks = [
  {
    title: "Approve New Professionals",
    description: "Review and verify newly registered professionals.",
    icon: "🧾",
  },
  {
    title: "Manage Users",
    description: "View, update, or remove user accounts securely.",
    icon: "👤",
  },
  {
    title: "System Reports",
    description: "Access analytics and system performance data.",
    icon: "📊",
  },
  {
    title: "Payment Management",
    description: "Monitor transactions and update billing records.",
    icon: "💰",
  },
  {
    title: "Security Settings",
    description: "Manage data protection and access permissions.",
    icon: "🔒",
  },
];

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        Control your entire platform from here. Manage professionals, users,
        reports, and security settings efficiently.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 p-6 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">{task.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {task.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {task.description}
            </p>
            <button className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
