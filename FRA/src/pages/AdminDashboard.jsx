import React, { useState } from 'react';
import { Users, Shield, Database, Activity, Settings, Download, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import InteractiveChart from '../components/InteractiveChart';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@fraatlas.gov.in', role: 'Forest Officer', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Priya Sharma', email: 'priya@fraatlas.gov.in', role: 'Data Analyst', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Amit Singh', email: 'amit@fraatlas.gov.in', role: 'District Coordinator', status: 'Inactive', lastLogin: '5 days ago' },
  ]);

  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Claims',
      value: '24,567',
      change: '+8.3%',
      trend: 'up',
      icon: Database,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      trend: 'up',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Data Processed',
      value: '2.4TB',
      change: '+15.7%',
      trend: 'up',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const nationalClaimsData = [
    { label: 'Madhya Pradesh', value: 12450, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Odisha', value: 8760, color: 'from-blue-400 to-blue-600' },
    { label: 'Telangana', value: 6540, color: 'from-purple-400 to-purple-600' },
    { label: 'Tripura', value: 3210, color: 'from-orange-400 to-orange-600' },
  ];

  const schemeCoverageData = [
    { label: 'PM-KISAN', value: 85, color: '#10b981' },
    { label: 'Jal Jeevan Mission', value: 72, color: '#3b82f6' },
    { label: 'MGNREGA', value: 91, color: '#8b5cf6' },
    { label: 'DAJGUA', value: 68, color: '#f59e0b' },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'claims', name: 'FRA Claims', icon: Database },
    { id: 'audit', name: 'Audit Logs', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Admin Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive system management and national FRA monitoring
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
              <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <AnimatedCard key={index} {...stat} delay={index * 100} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InteractiveChart
                type="bar"
                data={nationalClaimsData}
                title="National FRA Claims by State"
                height={300}
              />
              <InteractiveChart
                type="pie"
                data={schemeCoverageData}
                title="Government Scheme Coverage (%)"
                height={300}
              />
            </div>

            {/* National Map Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">National FRA Atlas Overview</h3>
              <div className="h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg relative overflow-hidden">
                {/* Simulated India Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-emerald-600 mb-2">🗺️</div>
                    <p className="text-lg font-semibold text-gray-700">Interactive National Map</p>
                    <p className="text-sm text-gray-600">All states and villages with FRA claims</p>
                  </div>
                </div>
                
                {/* State indicators */}
                <div className="absolute top-4 left-4 space-y-2">
                  {nationalClaimsData.map((state, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${state.color}`}></div>
                      <span className="text-sm font-medium">{state.label}</span>
                      <span className="text-sm text-gray-600">{state.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <p className="text-gray-600">Manage system users and their roles</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{user.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-emerald-600 hover:text-emerald-900 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">National FRA Claims Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600">24,567</div>
                  <div className="text-sm text-gray-600">Total Claims</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">18,423</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">6,144</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Audit Logs</h3>
              <div className="space-y-4">
                {[
                  { action: 'User Login', user: 'admin@fraatlas.gov.in', time: '2 minutes ago', status: 'success' },
                  { action: 'Data Export', user: 'analyst@fraatlas.gov.in', time: '1 hour ago', status: 'success' },
                  { action: 'Failed Login Attempt', user: 'unknown@email.com', time: '3 hours ago', status: 'warning' },
                  { action: 'System Backup', user: 'system', time: '6 hours ago', status: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 
                        log.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{log.action}</p>
                        <p className="text-sm text-gray-600">{log.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;