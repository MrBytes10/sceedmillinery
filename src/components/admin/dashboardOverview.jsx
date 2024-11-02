// src/components/admin/DashboardOverview.jsx
import React from "react";

const DashboardOverview = () => {
  const stats = [
    { label: "Total Products", value: "124" },
    { label: "Active Orders", value: "8" },
    { label: "Total Users", value: "1,205" },
    { label: "Revenue (MTD)", value: "$ 452,000" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
