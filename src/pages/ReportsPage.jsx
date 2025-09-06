import React, { useState, useMemo } from "react";
import { FileText, Download, Share2, Search, Filter, ArrowUpDown, Plus } from 'lucide-react';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

  const allReports = [
    { id: 1, title: "FRA Claim Status Report - Q3 2025", date: "2025-09-01", category: "Claim Analysis", format: "PDF", size: "2.5MB" },
    { id: 2, title: "District-wise Forest Cover Analysis", date: "2025-08-20", category: "Environmental", format: "CSV", size: "1.2MB" },
    { id: 3, title: "Settlement Impact Report - Balaghat", date: "2025-08-10", category: "Socio-Economic", format: "PDF", size: "5.1MB" },
    { id: 4, title: "Monthly Claim Summary - August 2025", date: "2025-09-02", category: "Summary", format: "XLSX", size: "800KB" },
    { id: 5, title: "Water Body Encroachment Study", date: "2025-07-15", category: "Environmental", format: "PDF", size: "3.4MB" },
    { id: 6, title: "IFR vs CFR Approval Rates - H1 2025", date: "2025-07-01", category: "Claim Analysis", format: "PDF", size: "1.8MB" },
  ];

  const categories = ['all', ...Array.from(new Set(allReports.map(r => r.category)))];

  const filteredAndSortedReports = useMemo(() => {
    let filtered = allReports.filter(report =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory !== 'all') {
      filtered = filtered.filter(report => report.category === filterCategory);
    }

    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, filterCategory, sortConfig, allReports]);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Filters and Search Toolbar */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full md:w-auto">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
                onChange={(e) => {
                    const [key, direction] = e.target.value.split(',');
                    setSortConfig({ key, direction });
                }}
                value={`${sortConfig.key},${sortConfig.direction}`}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
            >
                <option value="date,descending">Date (Newest)</option>
                <option value="date,ascending">Date (Oldest)</option>
                <option value="title,ascending">Title (A-Z)</option>
                <option value="title,descending">Title (Z-A)</option>
            </select>
        </div>
      </div>

      {/* Reports List */}
      {filteredAndSortedReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedReports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="flex items-start mb-3">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 leading-tight">{report.title}</h3>
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">{report.category}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 space-y-1 mt-4">
                  <div className="flex justify-between"><span>Date:</span><span className="font-medium text-gray-700">{new Date(report.date).toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span>Format:</span><span className="font-medium text-gray-700">{report.format}</span></div>
                  <div className="flex justify-between"><span>Size:</span><span className="font-medium text-gray-700">{report.size}</span></div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-200 flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"><Download className="w-4 h-4 mr-2" />Download</button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"><Share2 className="w-4 h-4 mr-2" />Share</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <Search className="w-12 h-12 mx-auto text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-800">No reports found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
