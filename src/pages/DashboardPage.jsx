import React from 'react';
import { Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import DashboardCards from '../components/DashboardCards';
import ChartPanel from '../components/ChartPanel';
import Filters from '../components/Filters';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FRA Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Comprehensive overview of Forest Rights Act implementation progress
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow transition-all">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow transition-all">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow hover:shadow-lg transition-all">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Filters />
        </div>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Charts and Analytics */}
        <ChartPanel />

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: 'New IFR application processed',
                location: 'Balaghat District, MP',
                time: '2 hours ago',
                status: 'success',
              },
              {
                action: 'CFR verification completed',
                location: 'Khargone District, MP',
                time: '4 hours ago',
                status: 'success',
              },
              {
                action: 'Asset mapping updated',
                location: 'West Tripura District',
                time: '6 hours ago',
                status: 'info',
              },
              {
                action: 'DSS recommendation generated',
                location: 'Kalahandi District, Odisha',
                time: '1 day ago',
                status: 'warning',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg transition-all hover:shadow-md hover:bg-gray-50`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.status === 'success'
                        ? 'bg-green-500'
                        : activity.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.location}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
