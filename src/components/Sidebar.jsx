import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Filter, BarChart3, Settings, Download } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: MapPin, label: 'Map Layers', active: true },
    { icon: Filter, label: 'Filters', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: Download, label: 'Export', active: false },
  ];

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 shadow-lg ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-semibold text-gray-900 text-lg">Map Controls</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-sm"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="p-2 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 shadow-sm ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 shadow-md'
                  : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto max-h-screen">
          {/* Quick Stats */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total Claims</span>
                <span className="font-medium">24,567</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Approved</span>
                <span className="font-medium text-green-600">18,423</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Pending</span>
                <span className="font-medium text-orange-600">4,321</span>
              </div>
            </div>
          </div>

          {/* Layer Controls */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Map Layers</h3>
            <div className="space-y-2">
              {[
                { name: 'FRA Claims', enabled: true },
                { name: 'Forest Cover', enabled: true },
                { name: 'Water Bodies', enabled: false },
                { name: 'Settlements', enabled: false },
                { name: 'Administrative', enabled: true },
              ].map((layer, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-emerald-50 p-2 rounded-md transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    defaultChecked={layer.enabled}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{layer.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <select className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                <option>All States</option>
                <option>Madhya Pradesh</option>
                <option>Tripura</option>
                <option>Odisha</option>
                <option>Telangana</option>
              </select>
              <select className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
