import React, { useState } from 'react';
import { FileText, MapPin, CheckCircle, Clock, Gift, User, Phone, Mail } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import InteractiveChart from '../components/InteractiveChart';

const PublicDashboard = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  const userInfo = {
    name: 'Ram Singh',
    village: 'Balaghat Village',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    phone: '+91-9876543210',
    email: 'ram.singh@email.com'
  };

  const myClaims = [
    {
      id: 'FRA-2024-001',
      type: 'Individual Forest Rights (IFR)',
      area: '2.5 hectares',
      status: 'approved',
      submittedDate: '2024-01-15',
      approvedDate: '2024-02-20',
      pattaNumber: 'IFR/BLG/2024/001'
    },
    {
      id: 'FRA-2024-045',
      type: 'Community Forest Rights (CFR)',
      area: '15.2 hectares',
      status: 'under_review',
      submittedDate: '2024-02-10',
      expectedDate: '2024-03-15'
    }
  ];

  const eligibleSchemes = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      benefit: '₹6,000/year',
      status: 'enrolled',
      nextPayment: '2024-04-01'
    },
    {
      name: 'Jal Jeevan Mission',
      description: 'Piped water supply to households',
      benefit: 'Tap water connection',
      status: 'eligible',
      action: 'Apply Now'
    },
    {
      name: 'MGNREGA',
      description: 'Guaranteed employment scheme',
      benefit: '100 days work/year',
      status: 'enrolled',
      daysWorked: 67
    },
    {
      name: 'DAJGUA Schemes',
      description: 'Tribal welfare programs',
      benefit: 'Various benefits',
      status: 'eligible',
      action: 'Check Eligibility'
    }
  ];

  const claimProgressData = [
    { label: 'Application', value: 100 },
    { label: 'Verification', value: 100 },
    { label: 'Field Visit', value: 100 },
    { label: 'Approval', value: 75 },
    { label: 'Patta Issue', value: 25 },
  ];

  const stats = [
    {
      title: 'My Claims',
      value: '2',
      change: '+1 new',
      trend: 'up',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Approved Area',
      value: '2.5 ha',
      change: 'IFR approved',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Pending Claims',
      value: '1',
      change: 'Under review',
      trend: 'up',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Scheme Benefits',
      value: '3',
      change: '1 new eligible',
      trend: 'up',
      icon: Gift,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My FRA Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Track your forest rights claims and eligible government schemes
              </p>
            </div>
            <div className="mt-4 lg:mt-0 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userInfo.name}</h3>
                  <p className="text-sm text-gray-600">{userInfo.village}, {userInfo.district}</p>
                </div>
              </div>
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
          {/* My Claims */}
          <div className="lg:col-span-2 space-y-6">
            {/* Claims List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">My FRA Claims</h3>
              
              <div className="space-y-4">
                {myClaims.map((claim) => (
                  <div 
                    key={claim.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">{claim.id}</span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                          claim.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {claim.status === 'approved' ? 'Approved' :
                           claim.status === 'under_review' ? 'Under Review' : 'Pending'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{claim.submittedDate}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{claim.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Area</p>
                        <p className="font-medium">{claim.area}</p>
                      </div>
                    </div>
                    
                    {claim.status === 'approved' && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <strong>Patta Number:</strong> {claim.pattaNumber}
                        </p>
                        <p className="text-sm text-green-800">
                          <strong>Approved Date:</strong> {claim.approvedDate}
                        </p>
                      </div>
                    )}
                    
                    {claim.status === 'under_review' && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Expected Decision:</strong> {claim.expectedDate}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Claim Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Claim Progress Tracking</h3>
              <InteractiveChart
                type="bar"
                data={claimProgressData.map(item => ({
                  label: item.label,
                  value: item.value,
                  color: item.value === 100 ? 'from-green-400 to-green-600' : 
                         item.value > 50 ? 'from-blue-400 to-blue-600' : 
                         'from-gray-300 to-gray-400'
                }))}
                title="Current Claim Processing Status"
                height={250}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Village Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Village</h3>
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏘️</div>
                    <p className="text-sm font-medium text-gray-700">{userInfo.village}</p>
                    <p className="text-xs text-gray-600">{userInfo.district}, {userInfo.state}</p>
                  </div>
                </div>
                
                {/* My land marker */}
                <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-emerald-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                <div className="absolute top-1/4 right-1/3 transform translate-x-6 -translate-y-8">
                  <div className="bg-white px-2 py-1 rounded shadow-lg text-xs font-medium">
                    My Land (2.5 ha)
                  </div>
                </div>
              </div>
            </div>

            {/* Eligible Schemes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Government Schemes</h3>
              <div className="space-y-4">
                {eligibleSchemes.map((scheme, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{scheme.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        scheme.status === 'enrolled' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {scheme.status === 'enrolled' ? 'Enrolled' : 'Eligible'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                    <p className="text-sm font-medium text-emerald-600 mb-3">
                      Benefit: {scheme.benefit}
                    </p>
                    
                    {scheme.status === 'enrolled' && scheme.nextPayment && (
                      <p className="text-xs text-gray-500">Next payment: {scheme.nextPayment}</p>
                    )}
                    
                    {scheme.status === 'enrolled' && scheme.daysWorked && (
                      <p className="text-xs text-gray-500">Days worked: {scheme.daysWorked}/100</p>
                    )}
                    
                    {scheme.status === 'eligible' && (
                      <button className="w-full mt-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                        {scheme.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Helpline</p>
                    <p className="text-sm text-gray-600">1800-XXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">help@fraatlas.gov.in</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">District Office</p>
                    <p className="text-sm text-gray-600">Balaghat Collectorate</p>
                  </div>
                </div>
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
                      <label className="text-sm font-medium text-gray-700">Area</label>
                      <p className="text-gray-900">{selectedClaim.area}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <p className="text-gray-900 capitalize">{selectedClaim.status.replace('_', ' ')}</p>
                    </div>
                  </div>
                  
                  {selectedClaim.pattaNumber && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">Approved Details</h4>
                      <p className="text-sm text-green-700">
                        <strong>Patta Number:</strong> {selectedClaim.pattaNumber}
                      </p>
                      <p className="text-sm text-green-700">
                        <strong>Approval Date:</strong> {selectedClaim.approvedDate}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDashboard;