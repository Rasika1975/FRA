import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { 
  Filter,
  Download,
  CalendarDays,
  ArrowUpDown
} from 'lucide-react'

// Mock UI components since they are not provided in the context.
// You can replace these with your actual components from `../components/ui/*`.
const Button = ({ children, className, ...props }) => <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 ${className}`} {...props}>{children}</button>
const Input = ({ className, ...props }) => <input className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
const Select = ({ children, className, ...props }) => <select className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>{children}</select>

const AnalyticsPage = () => {
  // State for filters
  const [dateRange, setDateRange] = useState({ from: '2023-01-01', to: '2023-12-31' });
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedClaimType, setSelectedClaimType] = useState('all');

  // Mock data for charts
  const claimsOverTimeData = [
    { month: 'Jan', submitted: 40, approved: 24, rejected: 8 },
    { month: 'Feb', submitted: 30, approved: 13, rejected: 5 },
    { month: 'Mar', submitted: 50, approved: 38, rejected: 10 },
    { month: 'Apr', submitted: 47, approved: 39, rejected: 4 },
    { month: 'May', submitted: 59, approved: 48, rejected: 7 },
    { month: 'Jun', submitted: 44, approved: 33, rejected: 6 },
  ]

  const districtStatusData = [
    { district: 'Bastar', approved: 85, pending: 25, rejected: 10 },
    { district: 'Dantewada', approved: 70, pending: 15, rejected: 10 },
    { district: 'Kanker', approved: 60, pending: 10, rejected: 10 },
    { district: 'Kondagaon', approved: 55, pending: 12, rejected: 8 },
    { district: 'Narayanpur', approved: 45, pending: 8, rejected: 7 },
  ]

  const detailedClaimsData = [
    { id: 'FRA001', holder: 'Ram Singh', district: 'Bastar', type: 'IFR', status: 'Approved', submitted: '2023-01-15', approved: '2023-02-20' },
    { id: 'FRA002', holder: 'Sita Devi', district: 'Dantewada', type: 'CFR', status: 'Pending', submitted: '2023-02-10', approved: '-' },
    { id: 'FRA003', holder: 'Gopal Yadav', district: 'Kanker', type: 'IFR', status: 'Rejected', submitted: '2023-03-05', approved: '-' },
    { id: 'FRA004', holder: 'Maya Bai', district: 'Kondagaon', type: 'IFR', status: 'Approved', submitted: '2023-03-20', approved: '2023-04-25' },
    { id: 'FRA005', holder: 'Kumar Singh', district: 'Narayanpur', type: 'CR', status: 'Under Review', submitted: '2023-04-01', approved: '-' },
    { id: 'FRA006', holder: 'Laxmi Netam', district: 'Bastar', type: 'CFR', status: 'Approved', submitted: '2023-04-12', approved: '2023-05-18' },
    { id: 'FRA007', holder: 'Ravi Kashyap', district: 'Dantewada', type: 'IFR', status: 'Pending', submitted: '2023-05-02', approved: '-' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FRA Analytics</h1>
        <p className="text-gray-600">In-depth analysis of Forest Rights Act claims data.</p>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
          <CardDescription>Refine the data shown in the charts and table below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input type="date" value={dateRange.from} onChange={e => setDateRange(d => ({...d, from: e.target.value}))} className="pl-10" />
                </div>
                <span>-</span>
                <div className="relative flex-1">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input type="date" value={dateRange.to} onChange={e => setDateRange(d => ({...d, to: e.target.value}))} className="pl-10" />
                </div>
              </div>
            </div>
            {/* District */}
            <div className="space-y-2">
              <label htmlFor="district-filter" className="text-sm font-medium">District</label>
              <Select id="district-filter" value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
                <option value="all">All Districts</option>
                <option value="Bastar">Bastar</option>
                <option value="Dantewada">Dantewada</option>
                <option value="Kanker">Kanker</option>
                <option value="Kondagaon">Kondagaon</option>
                <option value="Narayanpur">Narayanpur</option>
              </Select>
            </div>
            {/* Claim Type */}
            <div className="space-y-2">
              <label htmlFor="claim-type-filter" className="text-sm font-medium">Claim Type</label>
              <Select id="claim-type-filter" value={selectedClaimType} onChange={e => setSelectedClaimType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="IFR">Individual Forest Rights (IFR)</option>
                <option value="CFR">Community Forest Rights (CFR)</option>
                <option value="CR">Community Rights (CR)</option>
              </Select>
            </div>
            {/* Action Buttons */}
            <div className="flex items-end space-x-2">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">Apply Filters</Button>
              <Button variant="outline" className="w-full border-gray-300">Reset</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Claims Over Time</CardTitle>
            <CardDescription>Monthly trend of submitted, approved, and rejected claims.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={claimsOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="submitted" stroke="#3B82F6" name="Submitted" />
                <Line type="monotone" dataKey="approved" stroke="#10B981" name="Approved" />
                <Line type="monotone" dataKey="rejected" stroke="#EF4444" name="Rejected" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* District Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">District Status Breakdown</CardTitle>
            <CardDescription>Distribution of claim statuses across districts.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtStatusData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="district" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" stackId="a" fill="#10B981" name="Approved" />
                <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Pending" />
                <Bar dataKey="rejected" stackId="a" fill="#EF4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Detailed Claims Data</CardTitle>
            <CardDescription>Browse, sort, and filter all claims in the system.</CardDescription>
          </div>
          <Button variant="outline" className="border-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Claim ID', 'Holder Name', 'District', 'Type', 'Status', 'Submitted', 'Approved'].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        {header}
                        <ArrowUpDown className="h-3 w-3 ml-1.5 text-gray-400" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {detailedClaimsData.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{claim.holder}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{claim.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{claim.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        claim.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{claim.submitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{claim.approved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsPage
