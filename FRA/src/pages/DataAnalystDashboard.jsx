import React, { useState } from 'react';
import { BarChart3, TrendingUp, Database, Download, Filter, Calendar, PieChart } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import InteractiveChart from '../components/InteractiveChart';

const DataAnalystDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedState, setSelectedState] = useState('all');

  const stats = [
    {
      title: 'Total Data Points',
      value: '2.4M',
      change: '+18.2%',
      trend: 'up',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Analytics Reports',
      value: '156',
      change: '+12.5%',
      trend: 'up',
      icon: BarChart3,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Scheme Alignment',
      value: '78.5%',
      change: '+5.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Predictions Made',
      value: '342',
      change: '+25.7%',
      trend: 'up',
      icon: PieChart,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const claimsAnalyticsData = [
    { label: 'Madhya Pradesh', value: 12450, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Odisha', value: 8760, color: 'from-blue-400 to-blue-600' },
    { label: 'Telangana', value: 6540, color: 'from-purple-400 to-purple-600' },
    { label: 'Tripura', value: 3210, color: 'from-orange-400 to-orange-600' },
  ];

  const schemeImpactData = [
    { label: 'PM-KISAN', value: 85, color: '#10b981' },
    { label: 'Jal Jeevan Mission', value: 72, color: '#3b82f6' },
    { label: 'MGNREGA', value: 91, color: '#8b5cf6' },
    { label: 'DAJGUA', value: 68, color: '#f59e0b' },
  ];

  const trendData = [
    { label: 'Jan', value: 1200 },
    { label: 'Feb', value: 1450 },
    { label: 'Mar', value: 1320 },
    { label: 'Apr', value: 1680 },
    { label: 'May', value: 1890 },
    { label: 'Jun', value: 2100 },
  ];

  const assetAnalyticsData = [
    { label: 'Forest Cover', value: 45, color: '#10b981' },
    { label: 'Agricultural Land', value: 30, color: '#f59e0b' },
    { label: 'Water Bodies', value: 15, color: '#3b82f6' },
    { label: 'Settlements', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Data Analyst Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Advanced analytics and insights for FRA implementation
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AnimatedCard key={index} {...stat} delay={index * 100} />
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InteractiveChart
            type="bar"
            data={claimsAnalyticsData}
            title="FRA Claims Analytics by State"
            height={350}
          />
          <InteractiveChart
            type="line"
            data={trendData}
            title="Claims Processing Trend"
            height={350}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InteractiveChart
            type="pie"
            data={schemeImpactData}
            title="Government Scheme Impact Analysis"
            height={350}
          />
          <InteractiveChart
            type="pie"
            data={assetAnalyticsData}
            title="Asset Distribution Analysis"
            height={350}
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Predictive Analytics */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Predictive Analytics & Recommendations</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-6">
              {/* High Priority Villages */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">High Priority Villages for Intervention</h4>
                <div className="space-y-3">
                  {[
                    {
                      village: 'Balaghat Village',
                      district: 'Balaghat, MP',
                      issue: 'Low water access, pending IFR claims',
                      recommendation: 'Jal Jeevan Mission + expedite IFR processing',
                      priority: 'high'
                    },
                    {
                      village: 'Khargone Settlement',
                      district: 'Khargone, MP',
                      issue: 'Limited agricultural support',
                      recommendation: 'PM-KISAN enrollment + MGNREGA projects',
                      priority: 'medium'
                    },
                    {
                      village: 'Dantewada Area',
                      district: 'Dantewada, CG',
                      issue: 'Forest degradation concerns',
                      recommendation: 'CFR implementation + conservation programs',
                      priority: 'high'
                    }
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{item.village}</h5>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.district}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Issue:</strong> {item.issue}</p>
                      <p className="text-sm text-emerald-700"><strong>Recommendation:</strong> {item.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheme Alignment Analysis */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">CSS Scheme Alignment Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { scheme: 'PM-KISAN', eligible: 21450, enrolled: 18232, gap: 3218 },
                    { scheme: 'Jal Jeevan Mission', eligible: 15670, enrolled: 11283, gap: 4387 },
                    { scheme: 'MGNREGA', eligible: 28900, enrolled: 26311, gap: 2589 },
                    { scheme: 'DAJGUA', eligible: 19200, enrolled: 13056, gap: 6144 },
                  ].map((scheme, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{scheme.scheme}</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Eligible:</span>
                          <span className="font-medium">{scheme.eligible.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Enrolled:</span>
                          <span className="font-medium text-green-600">{scheme.enrolled.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gap:</span>
                          <span className="font-medium text-red-600">{scheme.gap.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${(scheme.enrolled / scheme.eligible) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reports */}
          <div className="space-y-6">
            {/* Generate Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">Claims Analytics Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Scheme Impact Analysis</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Database className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Asset Mapping Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <PieChart className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-700">Predictive Analysis</span>
                </button>
              </div>
            </div>

            {/* Data Quality Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality Metrics</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Data Completeness', value: 94.2, color: 'emerald' },
                  { metric: 'Accuracy Score', value: 97.8, color: 'blue' },
                  { metric: 'Timeliness', value: 89.5, color: 'purple' },
                  { metric: 'Consistency', value: 92.1, color: 'orange' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalystDashboard;