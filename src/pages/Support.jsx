import React from "react";

function Support() {
  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Customer Support</h1>
      <p className="text-gray-700 mb-6">We’re here to help! Reach out with any issues or questions.</p>

      <form className="max-w-lg bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-md focus:outline-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-md focus:outline-blue-500"
        />
        <textarea
          rows="4"
          placeholder="Describe your issue..."
          className="w-full p-3 border rounded-md focus:outline-blue-500"
        ></textarea>
        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Support;
