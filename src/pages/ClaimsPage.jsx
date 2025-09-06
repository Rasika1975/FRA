import React, { useState, useMemo } from "react";
import { Search, Filter, Plus, ChevronUp, ChevronDown, Eye, Edit, Trash2 } from 'lucide-react';

const ClaimsPage = () => {
  // State for search, filters, sorting, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: 'all', status: 'all' });
  const [sortConfig, setSortConfig] = useState({ key: 'submittedDate', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Expanded mock data
  const allClaims = [
    { id: 1, claimId: 'FRA-BLG-001', name: "Balaghat Village", applicant: 'Ram Singh', type: "IFR", status: "approved", submittedDate: '2024-01-15', area: '2.5 ha' },
    { id: 2, claimId: 'FRA-KHG-001', name: "Khargone Settlement", applicant: 'Sita Devi', type: "CFR", status: "under_review", submittedDate: '2024-02-10', area: '15.2 ha' },
    { id: 3, claimId: 'FRA-DTW-001', name: "Dantewada Area", applicant: 'Mohan Lal', type: "IFR", status: "approved", submittedDate: '2023-12-20', area: '3.1 ha' },
    { id: 4, claimId: 'FRA-BLG-002', name: "Balaghat Village", applicant: 'Gita Bai', type: "IFR", status: "rejected", submittedDate: '2024-01-18', area: '1.8 ha' },
    { id: 5, claimId: 'FRA-SRP-001', name: "Sarguja Community Forest", applicant: 'Community', type: "CFR", status: "approved", submittedDate: '2023-11-05', area: '50.0 ha' },
    { id: 6, claimId: 'FRA-KHG-002', name: "Khargone Settlement", applicant: 'Ramesh Patel', type: "IFR", status: "under_review", submittedDate: '2024-03-01', area: '2.0 ha' },
    { id: 7, claimId: 'FRA-DTW-002', name: "Dantewada Area", applicant: 'Sunita Markam', type: "IFR", status: "document_pending", submittedDate: '2024-02-25', area: '4.5 ha' },
  ];

  // Filtering and Sorting Logic
  const filteredAndSortedClaims = useMemo(() => {
    let filtered = allClaims.filter(claim => {
      const searchMatch = claim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.claimId.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filters.type === 'all' || claim.type === filters.type;
      const statusMatch = filters.status === 'all' || claim.status === filters.status;
      return searchMatch && typeMatch && statusMatch;
    });

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
  }, [searchTerm, filters, sortConfig]);

  // Pagination Logic
  const paginatedClaims = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedClaims.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedClaims, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedClaims.length / itemsPerPage);

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Helper to render status badges
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      approved: 'bg-green-100 text-green-800',
      under_review: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      document_pending: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  // Helper for sortable table headers
  const SortableHeader = ({ label, sortKey }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort(sortKey)}>
      <div className="flex items-center">
        {label}
        {sortConfig.key === sortKey ? (
          sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
        ) : null}
      </div>
    </th>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Claims</h1>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          File New Claim
        </button>
      </div>

      {/* Toolbar */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, name, or applicant..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white">
              <option value="all">All Types</option>
              <option value="IFR">IFR</option>
              <option value="CFR">CFR</option>
            </select>
          </div>
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white">
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="under_review">Under Review</option>
              <option value="rejected">Rejected</option>
              <option value="document_pending">Document Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader label="Claim ID" sortKey="claimId" />
                <SortableHeader label="Village/Area" sortKey="name" />
                <SortableHeader label="Applicant" sortKey="applicant" />
                <SortableHeader label="Type" sortKey="type" />
                <SortableHeader label="Submitted" sortKey="submittedDate" />
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedClaims.length > 0 ? paginatedClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.claimId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{claim.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.applicant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(claim.submittedDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-emerald-600 hover:text-emerald-900 transition-colors" title="View Details"><Eye className="w-5 h-5" /></button>
                      <button className="text-blue-600 hover:text-blue-900 transition-colors" title="Edit Claim"><Edit className="w-5 h-5" /></button>
                      <button className="text-red-600 hover:text-red-900 transition-colors" title="Delete Claim"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <Search className="w-12 h-12 mx-auto text-gray-300" />
                    <h3 className="mt-2 text-lg font-medium text-gray-800">No claims found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedClaims.length)}</span> of <span className="font-medium">{filteredAndSortedClaims.length}</span> results
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimsPage;
