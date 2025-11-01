import React from "react";

function Professional() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Professional Dashboard</h1>
      <p className="text-gray-700 mb-6">Create and manage your profile, list services, and connect with clients.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Add New Service</h2>
          <p className="text-sm text-gray-600">Describe your expertise and pricing.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Manage Appointments</h2>
          <p className="text-sm text-gray-600">View your client bookings and schedules.</p>
        </div>
      </div>
    </div>
  );
}

export default Professional;
