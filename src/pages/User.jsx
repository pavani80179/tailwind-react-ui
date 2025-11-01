import React from "react";

function User() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">User Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Search for professionals, hire services, and give feedback on completed work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Search Professionals</h2>
          <p>Find experts by skill, location, or rating.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-2">View Bookings</h2>
          <p>Check your service requests and progress.</p>
        </div>
      </div>
    </div>
  );
}

export default User;
