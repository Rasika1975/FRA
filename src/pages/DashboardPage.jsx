import React from "react";
import {
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  MapPin,
} from "lucide-react";
import DashboardCards from "../components/DashboardCards";
import ChartPanel from "../components/ChartPanel";
import Filters from "../components/Filters";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              FRA Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Comprehensive overview of Forest Rights Act implementation progress
            </p>
            <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
              Last updated 5 mins ago
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600" /> Advanced Filters
          </h2>
          <Filters />
        </div>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Charts and Analytics */}
        <ChartPanel />

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {[
                {
                  action: "New IFR application processed",
                  location: "Balaghat District, MP",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  action: "CFR verification completed",
                  location: "Khargone District, MP",
                  time: "4 hours ago",
                  status: "success",
                },
                {
                  action: "Asset mapping updated",
                  location: "West Tripura District",
                  time: "6 hours ago",
                  status: "info",
                },
                {
                  action: "DSS recommendation generated",
                  location: "Kalahandi District, Odisha",
                  time: "1 day ago",
                  status: "warning",
                },
              ].map((activity, index) => (
                <div key={index} className="relative pl-10">
                  {/* Status Dot */}
                  <span
                    className={`absolute left-1.5 top-2 w-3 h-3 rounded-full ring-4 ring-white ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></span>

                  {/* Card */}
                  <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-100 transition-all shadow-sm hover:shadow-md">
                    <p className="font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {activity.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
