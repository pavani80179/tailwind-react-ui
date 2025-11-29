import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const storedPros = JSON.parse(localStorage.getItem("professionals")) || [];
    setProfessionals(storedPros);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>
      <p className="text-center mb-8">
        Control your entire platform from here. Manage professionals, users, and security settings efficiently.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/admin/approve")}
          className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Approve New Professionals</h2>
          <p>Review and verify newly registered professionals.</p>
        </div>

        <div
          onClick={() => navigate("/admin/manage-users")}
          className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p>View, update, or remove user accounts securely.</p>
        </div>

        <div
          onClick={() => navigate("/admin/payment-management")}
          className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Payment Management</h2>
          <p>Monitor transactions and update billing records.</p>
        </div>

        <div
          onClick={() => navigate("/admin/system-reports")}
          className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">System Reports</h2>
          <p>Access analytics and performance data.</p>
        </div>

        <div
          onClick={() => navigate("/admin/security-settings")}
          className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Security Settings</h2>
          <p>Manage data protection and access permissions.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Registered Professionals</h2>
      {professionals.length === 0 ? (
        <p>No professionals registered yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {professionals.map((pro, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-3 border">{pro.name}</td>
                <td className="p-3 border">{pro.email}</td>
                <td className="p-3 border">{pro.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
