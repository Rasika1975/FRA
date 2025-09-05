import React, { useState } from 'react';
import { Users, MapPin, CheckCircle, Clock, AlertTriangle, FileText, Target, Award } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import InteractiveChart from '../components/InteractiveChart';

const DistrictCoordinatorDashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('balaghat');

  const stats = [
    {
      title: 'District Villages',
      value: '342',
      change: '+2.1%',
      trend: 'up',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Officers',
      value: '28',
      change: '+5.3%',
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Completed Claims',
      value: '1,456',
      change: '+12.8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Pending Tasks',
      value: '89',
      change: '-8.2%',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const districtProgressData = [
    { label: 'Jan', value: 85 },
    { label: 'Feb', value: 88 },
    { label: 'Mar', value: 92 },
    { label: 'Apr', value: 87 },
    { label: 'May', value: 94 },
    { label: 'Jun', value: 96 },
  ];

  const villageStatusData = [
    { label: 'Completed', value: 156, color: '#10b981' },
    { label: 'In Progress', value: 89, color: '#3b82f6' },
    { label: 'Pending', value: 67, color: '#f59e0b' },
    { label: 'Issues', value: 30, color: '#ef4444' },
  ];

  const officers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      area: 'North Block',
      villages: 45,
      completed: 38,
      pending: 7,
      performance: 84.4,
      status: 'active'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      area: 'South Block',
      villages: 52,
      completed: 47,
      pending: 5,
      performance: 90.4,
      status: 'active'
    },
    {
      id: 3,
      name: 'Amit Singh',
      area: 'East Block',
      villages: 38,
      completed: 29,
      pending: 9,
      performance: 76.3,
      status: 'needs_attention'
    },
  ];

  const schemeRecommendations = [
    {
      village: 'Balaghat Village',
      population: 450,
      issue: 'Water scarcity',
      recommendedScheme: 'Jal Jeevan Mission',
      priority: 'high',
      estimatedBenefit: '₹12.5L'
    },
    {
      village: 'Khargone Settlement',
      population: 320,
      issue: 'Limited agricultural support',
      recommendedScheme: 'PM-KISAN + MGNREGA',
      priority: 'medium',
      estimatedBenefit: '₹8.2L'
    },
    {
      village: 'Dantewada Area',
      population: 280,
      issue: 'Infrastructure development',
      recommendedScheme: 'PMGSY + Electrification',
      priority: 'high',
      estimatedBenefit: '₹15.8L'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">District Coordinator Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Monitor district-level FRA progress and coordinate field operations
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="balaghat">Balaghat District</option>
                <option value="khargone">Khargone District</option>
                <option value="dantewada">Dantewada District</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105">
                <Target className="w-4 h-4 mr-2" />
                Assign Task
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* District Progress */}
          <div className="lg:col-span-2">
            <InteractiveChart
              type="line"
              data={districtProgressData}
              title="District FRA Implementation Progress (%)"
              height={350}
            />
          </div>

          {/* Village Status Overview */}
          <div>
            <InteractiveChart
              type="pie"
              data={villageStatusData}
              title="Village Status Distribution"
              height={350}
            />
          </div>
        </div>

        {/* Officer Management & Scheme Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Officer Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Officer Performance</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {officers.map((officer) => (
                <div key={officer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{officer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{officer.name}</h4>
                        <p className="text-sm text-gray-600">{officer.area}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      officer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {officer.status === 'active' ? 'Active' : 'Needs Attention'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Villages</p>
                      <p className="font-semibold text-gray-900">{officer.villages}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="font-semibold text-green-600">{officer.completed}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="font-semibold text-orange-600">{officer.pending}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className={`font-medium ${
                      officer.performance >= 85 ? 'text-green-600' : 
                      officer.performance >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {officer.performance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        officer.performance >= 85 ? 'bg-green-500' : 
                        officer.performance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${officer.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheme Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">DSS Scheme Recommendations</h3>
              <Award className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {schemeRecommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.village}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Population:</span>
                      <span className="font-medium">{rec.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issue:</span>
                      <span className="font-medium">{rec.issue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recommended:</span>
                      <span className="font-medium text-emerald-600">{rec.recommendedScheme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Benefit:</span>
                      <span className="font-medium text-blue-600">{rec.estimatedBenefit}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-3 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                    Approve Recommendation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District Map */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">District Boundaries & Villages</h3>
          <div className="h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-xl font-semibold text-gray-700">Balaghat District Map</p>
                <p className="text-sm text-gray-600">342 villages with FRA implementation status</p>
              </div>
            </div>
            
            {/* Village status indicators */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Village Status</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Completed (156)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">In Progress (89)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Pending (67)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Issues (30)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mock village markers */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictCoordinatorDashboard;