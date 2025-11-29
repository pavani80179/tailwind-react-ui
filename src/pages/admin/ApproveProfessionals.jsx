import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";

export default function ApproveProfessionals() {
  const { data, loading, error } = useFetchData("/data/professionals.json");

  // local state to keep track of approval
  const [statusMap, setStatusMap] = useState({}); // { id: "approved" | "rejected" }

  const handleStatus = (id, status) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">
        Approve Professionals
      </h1>
      <p className="text-sm text-slate-600">
        Here admin can approve or reject professionals before they appear in search results.
        (Demo using local JSON data.)
      </p>

      {loading && <p>Loading professionals...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Rate</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">{p.location}</td>
                <td className="px-4 py-2">₹{p.rate}/hr</td>
                <td className="px-4 py-2">
                  {statusMap[p.id] ? (
                    <span
                      className={
                        statusMap[p.id] === "approved"
                          ? "text-green-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {statusMap[p.id].toUpperCase()}
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleStatus(p.id, "approved")}
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(p.id, "rejected")}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {!loading && !error && data.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-slate-500" colSpan="6">
                  No professionals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
