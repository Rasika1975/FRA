import React from 'react'
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
  Line
} from 'recharts'
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Scan
} from 'lucide-react'

const DashboardPage = () => {
  // Mock data for charts
  const claimsStatusData = [
    { name: 'Approved', value: 45, color: '#10B981' },
    { name: 'Pending', value: 30, color: '#F59E0B' },
    { name: 'Rejected', value: 15, color: '#EF4444' },
    { name: 'Under Review', value: 10, color: '#6B7280' }
  ]

  const progressTrendData = [
    { year: '2020', claims: 120, approved: 80 },
    { year: '2021', claims: 180, approved: 120 },
    { year: '2022', claims: 250, approved: 180 },
    { year: '2023', claims: 320, approved: 240 },
    { year: '2024', claims: 400, approved: 300 }
  ]

  const districtData = [
    { district: 'Bastar', claims: 120, approved: 85 },
    { district: 'Dantewada', claims: 95, approved: 70 },
    { district: 'Kanker', claims: 80, approved: 60 },
    { district: 'Kondagaon', claims: 75, approved: 55 },
    { district: 'Narayanpur', claims: 60, approved: 45 }
  ]

  const recentActivity = [
    { id: 1, action: 'New claim submitted', holder: 'Ram Singh', village: 'Bastar', time: '2 hours ago' },
    { id: 2, action: 'Claim approved', holder: 'Sita Devi', village: 'Dantewada', time: '4 hours ago' },
    { id: 3, action: 'Document uploaded', holder: 'Gopal Yadav', village: 'Kanker', time: '6 hours ago' },
    { id: 4, action: 'Claim rejected', holder: 'Maya Bai', village: 'Kondagaon', time: '8 hours ago' },
    { id: 5, action: 'Review completed', holder: 'Kumar Singh', village: 'Narayanpur', time: '10 hours ago' }
  ]

  const stats = [
    { title: 'Total Claims', value: '1,250', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Approved', value: '850', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Pending', value: '300', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Rejected', value: '100', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { title: 'Digitized', value: '1,100', icon: Scan, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ]

  return (
<<<<<<< HEAD:FRA/src/pages/DashboardPage.jsx
    <div className="space-y-6 px-4 lg:px-8 pt-5"> {/* <-- Added horizontal padding here */}
=======
    <div className="p-6 space-y-6">
>>>>>>> 8a188390f6d4c69d006e04f620b107766c2aec63:src/pages/DashboardPage.jsx
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of FRA claims and system performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Claims Status Distribution</CardTitle>
            <CardDescription>Current status of all FRA claims</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={claimsStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {claimsStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Progress Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Trend Over Years</CardTitle>
            <CardDescription>Claims submitted and approved over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="claims" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Total Claims"
                />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Approved"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* District-wise Claims and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District-wise Claims */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">District-wise Claims</CardTitle>
            <CardDescription>Claims distribution across districts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="claims" fill="#3B82F6" name="Total Claims" />
                <Bar dataKey="approved" fill="#10B981" name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.holder} • {activity.village}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
