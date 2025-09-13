import React, { useState } from 'react';
import { MapPin, CheckCircle, Clock, AlertTriangle, FileText, Camera, Users } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import InteractiveChart from '../components/InteractiveChart';

const ForestOfficerDashboard = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeTab, setActiveTab] = useState('claims');

  const stats = [
    {
      title: 'Assigned Claims',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Pending Verification',
      value: '42',
      change: '-12.5%',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Approved This Month',
      value: '89',
      change: '+15.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Field Visits',
      value: '23',
      change: '+5.7%',
      trend: 'up',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const pendingClaims = [
    {
      id: 'FRA-2024-001',
      village: 'Balaghat Village',
      applicant: 'Ram Singh',
      type: 'IFR',
      area: '2.5 hectares',
      submittedDate: '2024-01-15',
      priority: 'high',
      status: 'verification_pending'
    },
    {
      id: 'FRA-2024-002',
      village: 'Khargone Settlement',
      applicant: 'Sita Devi',
      type: 'CFR',
      area: '15.2 hectares',
      submittedDate: '2024-01-12',
      priority: 'medium',
      status: 'field_visit_required'
    },
    {
      id: 'FRA-2024-003',
      village: 'Dantewada Area',
      applicant: 'Mohan Lal',
      type: 'IFR',
      area: '3.1 hectares',
      submittedDate: '2024-01-10',
      priority: 'low',
      status: 'document_review'
    },
  ];

  const assetData = [
    { label: 'Forest Cover', value: 65, color: '#10b981' },
    { label: 'Agricultural Land', value: 25, color: '#f59e0b' },
    { label: 'Water Bodies', value: 8, color: '#3b82f6' },
    { label: 'Settlements', value: 2, color: '#8b5cf6' },
  ];

  const claimStatusData = [
    { label: 'Jan', value: 12 },
    { label: 'Feb', value: 19 },
    { label: 'Mar', value: 15 },
    { label: 'Apr', value: 22 },
    { label: 'May', value: 18 },
    { label: 'Jun', value: 25 },
  ];

  const handleApprove = (claimId) => {
    console.log('Approving claim:', claimId);
    // Add approval logic here
  };

  const handleReject = (claimId) => {
    console.log('Rejecting claim:', claimId);
    // Add rejection logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Forest Officer Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Manage FRA claims and monitor assigned forest areas
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105">
                <Camera className="w-4 h-4 mr-2" />
                Field Report
              </button>
              <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin className="w-4 h-4 mr-2" />
                View Map
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Claims Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Claims */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Claims</h3>
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                  {pendingClaims.length} pending
                </span>
              </div>
              
              <div className="space-y-4">
                {pendingClaims.map((claim) => (
                  <div 
                    key={claim.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">{claim.id}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          claim.priority === 'high' ? 'bg-red-100 text-red-800' :
                          claim.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {claim.priority} priority
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{claim.submittedDate}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Village</p>
                        <p className="font-medium">{claim.village}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Applicant</p>
                        <p className="font-medium">{claim.applicant}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{claim.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Area</p>
                        <p className="font-medium">{claim.area}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        claim.status === 'verification_pending' ? 'bg-orange-100 text-orange-800' :
                        claim.status === 'field_visit_required' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {claim.status.replace('_', ' ')}
                      </span>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(claim.id);
                          }}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(claim.id);
                          }}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Progress Chart */}
            <InteractiveChart
              type="line"
              data={claimStatusData}
              title="Monthly Claim Processing Progress"
              height={300}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Area Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Forest Area</h3>
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌲</div>
                    <p className="text-sm font-medium text-gray-700">Balaghat Forest Division</p>
                    <p className="text-xs text-gray-600">2,450 hectares</p>
                  </div>
                </div>
                
                {/* Mock location markers */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 right-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Asset Distribution */}
            <InteractiveChart
              type="pie"
              data={assetData}
              title="Asset Distribution in Assigned Area"
              height={250}
            />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                  <Camera className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">Upload Field Photos</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Generate Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Detail Modal */}
        {selectedClaim && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Claim Details</h3>
                  <button 
                    onClick={() => setSelectedClaim(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Claim ID</label>
                      <p className="text-gray-900">{selectedClaim.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Type</label>
                      <p className="text-gray-900">{selectedClaim.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Village</label>
                      <p className="text-gray-900">{selectedClaim.village}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Applicant</label>
                      <p className="text-gray-900">{selectedClaim.applicant}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-6">
                    <button 
                      onClick={() => {
                        handleApprove(selectedClaim.id);
                        setSelectedClaim(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Claim
                    </button>
                    <button 
                      onClick={() => {
                        handleReject(selectedClaim.id);
                        setSelectedClaim(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Claim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForestOfficerDashboard;