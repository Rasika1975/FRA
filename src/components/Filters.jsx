import React, { useState } from 'react';
import { Filter, Search, MapPin, Calendar } from 'lucide-react';

const Filters = () => {
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    status: '',
    dateRange: '',
    search: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];
  const statuses = ['All', 'Approved', 'Pending', 'Rejected', 'Under Review'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search villages, pattas..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* State Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <select
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="">All Districts</option>
            <option value="balaghat">Balaghat</option>
            <option value="khargone">Khargone</option>
            <option value="dantewada">Dantewada</option>
            <option value="west-tripura">West Tripura</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status.toLowerCase()}>{status}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
          >
            <option value="">All Time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.state || filters.district || filters.status || filters.search) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.search && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              Search: {filters.search}
            </span>
          )}
          {filters.state && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              State: {filters.state}
            </span>
          )}
          {filters.district && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              District: {filters.district}
            </span>
          )}
          {filters.status && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              Status: {filters.status}
            </span>
          )}
          <button
            onClick={() => setFilters({ state: '', district: '', status: '', dateRange: '', search: '' })}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
