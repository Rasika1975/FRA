import React from "react";

const AnalyticsPage = () => {
  const stats = [
    { label: "Total FRA Claims", value: 1200 },
    { label: "Approved Claims", value: 860 },
    { label: "Pending Claims", value: 340 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-white shadow rounded-lg text-center border border-gray-200"
          >
            <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
            <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
