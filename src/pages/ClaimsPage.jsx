import React from "react";

const ClaimsPage = () => {
  const claims = [
    { id: 1, name: "Balaghat Village", type: "IFR", status: "approved" },
    { id: 2, name: "Khargone Settlement", type: "CFR", status: "pending" },
    { id: 3, name: "Dantewada Area", type: "IFR", status: "approved" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">FRA Claims</h2>
      <table className="min-w-full border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Village/Area</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.type}</td>
              <td className="px-4 py-2 capitalize">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsPage;
