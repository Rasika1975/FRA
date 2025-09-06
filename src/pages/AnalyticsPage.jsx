import React, { useState } from "react";
import { PieChart, BarChart, LineChart, TrendingUp, TrendingDown, Filter, Calendar, MapPin, FileText, CheckCircle, Clock } from 'lucide-react';

// A simplified chart component for demonstration purposes
const InteractiveChart = ({ title, type, data }) => {
  // In a real app, this would use a library like Recharts, Chart.js, or D3
  const chartColors = ["bg-emerald-500", "bg-blue-500", "bg-orange-500", "bg-purple-500", "bg-red-500"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">
            {type === 'pie' && <PieChart className="w-16 h-16 text-gray-300" />}
            {type === 'bar' && <BarChart className="w-16 h-16 text-gray-300" />}
            {type === 'line' && <LineChart className="w-16 h-16 text-gray-300" />}
            <span className="mt-2 block text-sm">Chart for "{title}"</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// A simplified animated card for stats
const AnimatedCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className={`p-2 rounded-lg ${color.replace('from-', 'bg-').split(' ')[0].replace('to-', '')} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('from-', 'text-').split(' ')[0].replace('to-', '')}`} />
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    <div className="flex items-center text-sm mt-2">
      <span className={`flex items-center mr-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {change}
      </span>
      <span className="text-gray-500">vs. previous period</span>
    </div>
  </div>
);

const AnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState('last_30_days');
  const [district, setDistrict] = useState('all');

  const stats = [
    { title: "Total FRA Claims", value: "1,258", change: "+5.2%", trend: 'up', icon: FileText, color: 'text-blue-600' },
    { title: "Approved Claims", value: "860", change: "+3.1%", trend: 'up', icon: CheckCircle, color: 'text-green-600' },
    { title: "Pending Claims", value: "340", change: "-1.5%", trend: 'down', icon: Clock, color: 'text-orange-600' },
    { title: "Approval Rate", value: "68.4%", change: "+1.2%", trend: 'up', icon: PieChart, color: 'text-purple-600' },
  ];

  const claimsByTypeData = [
    { name: 'IFR', value: 750 },
    { name: 'CFR', value: 508 },
  ];

  const claimsOverTimeData = [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 95 },
    { name: 'Apr', value: 150 },
    { name: 'May', value: 130 },
    { name: 'Jun', value: 180 },
  ];

  const claimsByStatusData = [
    { name: 'Approved', value: 860 },
    { name: 'Pending', value: 340 },
    { name: 'Rejected', value: 58 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white text-sm"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="all_time">All Time</option>
            </select>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white text-sm"
            >
              <option value="all">All Districts</option>
              <option value="balaghat">Balaghat</option>
              <option value="khargone">Khargone</option>
              <option value="dantewada">Dantewada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <AnimatedCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <InteractiveChart
            title="Claims Over Time"
            type="line"
            data={claimsOverTimeData}
          />
        </div>
        <div>
          <InteractiveChart
            title="Claims by Type"
            type="bar"
            data={claimsByTypeData}
          />
        </div>
        <div>
          <InteractiveChart
            title="Claims by Status"
            type="pie"
            data={claimsByStatusData}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
