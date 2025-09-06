import React from "react";
import {
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  MapPin,
  TrendingUp,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  BarChart3,
  PieChart,
  Activity,
  Target
} from "lucide-react";
import DashboardCards from "../components/DashboardCards";
import ChartPanel from "../components/ChartPanel";
import Filters from "../components/Filters";

const DashboardPage = () => {
  // Sample data for enhanced graphs
  const performanceMetrics = [
    {
      title: "Application Processing Rate",
      value: "78.5%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "emerald",
      description: "Applications processed within 60 days",
      target: "85%"
    },
    {
      title: "Rights Recognition Accuracy",
      value: "92.3%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "blue",
      description: "Accurate verification of forest rights",
      target: "95%"
    },
    {
      title: "Community Engagement",
      value: "67.8%",
      change: "-1.3%",
      trend: "down",
      icon: Users,
      color: "purple",
      description: "Active community participation",
      target: "80%"
    },
    {
      title: "Documentation Quality",
      value: "84.2%",
      change: "+3.7%",
      trend: "up",
      icon: FileText,
      color: "orange",
      description: "Complete and accurate submissions",
      target: "90%"
    }
  ];

  const graphInsights = [
    {
      title: "Regional Performance Analysis",
      type: "Bar Chart",
      icon: BarChart3,
      insights: [
        "Madhya Pradesh leads with 89% completion rate",
        "Odisha shows 15% improvement in Q3",
        "West Bengal requires additional support"
      ],
      lastUpdated: "2 hours ago",
      dataPoints: "2,847 records"
    },
    {
      title: "Application Status Distribution",
      type: "Donut Chart",
      icon: PieChart,
      insights: [
        "42% applications approved successfully",
        "28% under review process",
        "18% pending documentation"
      ],
      lastUpdated: "30 minutes ago",
      dataPoints: "15,692 applications"
    },
    {
      title: "Temporal Trends",
      type: "Line Graph",
      icon: Activity,
      insights: [
        "25% increase in applications this quarter",
        "Peak processing during monsoon months",
        "Seasonal patterns identified"
      ],
      lastUpdated: "1 hour ago",
      dataPoints: "24 months data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 rounded-full blur-xl"></div>
            <h1 className="relative text-4xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-600 bg-clip-text text-transparent">
              FRA Dashboard
            </h1>
            <p className="mt-2 text-lg text-slate-600 max-w-2xl">
              Comprehensive overview of Forest Rights Act implementation progress with advanced analytics
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full ring-1 ring-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Live • Updated 5 mins ago
              </span>
              <span className="text-sm text-slate-500">
                Monitoring 24,567 applications across 12 states
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="group flex items-center px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg hover:border-slate-300 transition-all duration-200 shadow-sm">
              <Filter className="w-4 h-4 mr-2 group-hover:text-emerald-600 transition-colors" />
              <span className="font-medium">Filters</span>
            </button>
            <button className="group flex items-center px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg hover:border-slate-300 transition-all duration-200 shadow-sm">
              <Calendar className="w-4 h-4 mr-2 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">Date Range</span>
            </button>
            <button className="group flex items-center px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg hover:border-slate-300 transition-all duration-200 shadow-sm">
              <Download className="w-4 h-4 mr-2 group-hover:text-purple-600 transition-colors" />
              <span className="font-medium">Export</span>
            </button>
            <button className="group px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
              <span className="flex items-center">
                + Start Project
                <div className="ml-2 w-1 h-1 bg-white rounded-full opacity-75 group-hover:animate-ping"></div>
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className={`group relative bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-slate-100/50 to-transparent rounded-bl-3xl"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${metric.color}-100 text-${metric.color}-600 group-hover:bg-${metric.color}-200 transition-colors`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-600">{metric.title}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900">{metric.value}</span>
                  <span className="text-sm text-slate-500 mb-1">/ {metric.target}</span>
                </div>
                <p className="text-xs text-slate-500">{metric.description}</p>
                
                {/* Progress bar */}
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 transition-all duration-1000`}
                    style={{ width: metric.value }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <Filter className="w-5 h-5" />
              </div>
              Advanced Filters & Analytics
            </h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
          <Filters />
        </div>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Enhanced Charts Panel with Graph Insights */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Data Visualization & Insights</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                Real-time
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                Historical
              </button>
            </div>
          </div>
          
          {/* Graph Insights Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {graphInsights.map((insight, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600">
                      <insight.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                      <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded-full mt-1 inline-block">
                        {insight.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    Key Insights
                  </h4>
                  <ul className="space-y-2">
                    {insight.insights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">{insight.dataPoints}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {insight.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <ChartPanel />
        </div>

        {/* Enhanced Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-100 text-purple-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                <p className="text-sm text-slate-500">Latest system updates and processing activities</p>
              </div>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All Activities →
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-blue-200 to-purple-200"></div>
            <div className="space-y-8">
              {[
                {
                  action: "New IFR application processed",
                  location: "Balaghat District, MP",
                  time: "2 hours ago",
                  status: "success",
                  details: "Application ID: IFR-2024-001847 approved for 4.2 hectares",
                  priority: "high"
                },
                {
                  action: "CFR verification completed",
                  location: "Khargone District, MP", 
                  time: "4 hours ago",
                  status: "success",
                  details: "Community rights verified for 127 households",
                  priority: "medium"
                },
                {
                  action: "Asset mapping updated",
                  location: "West Tripura District",
                  time: "6 hours ago",
                  status: "info",
                  details: "Satellite imagery analysis completed for 18 villages",
                  priority: "low"
                },
                {
                  action: "DSS recommendation generated",
                  location: "Kalahandi District, Odisha",
                  time: "1 day ago",
                  status: "warning",
                  details: "Additional documentation required for 23 applications",
                  priority: "high"
                },
              ].map((activity, index) => (
                <div key={index} className="relative pl-16">
                  {/* Enhanced Status Dot */}
                  <div className="absolute left-4 top-3">
                    <span
                      className={`flex w-4 h-4 rounded-full ring-4 ring-white shadow-sm ${
                        activity.status === "success"
                          ? "bg-emerald-500"
                          : activity.status === "warning"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    >
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        activity.status === "success"
                          ? "bg-emerald-400"
                          : activity.status === "warning"
                          ? "bg-amber-400"
                          : "bg-blue-400"
                      }`}></span>
                    </span>
                  </div>

                  {/* Enhanced Card */}
                  <div className="group bg-gradient-to-r from-slate-50 to-white hover:from-white hover:to-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all shadow-sm hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-slate-900 group-hover:text-slate-800">
                            {activity.action}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                            activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {activity.priority}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{activity.details}</p>
                        <div className="flex items-center text-sm text-slate-500 gap-4">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {activity.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {activity.status === "success" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                        {activity.status === "warning" && <AlertCircle className="w-5 h-5 text-amber-500" />}
                        {activity.status === "info" && <Info className="w-5 h-5 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Activity Summary */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">156</div>
                <div className="text-sm text-emerald-700">Completed Today</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">43</div>
                <div className="text-sm text-blue-700">In Progress</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl font-bold text-amber-600">12</div>
                <div className="text-sm text-amber-700">Pending Review</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-purple-700">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;