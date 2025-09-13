import React from 'react';
import { TrendingUp, TrendingDown, Users, MapPin, FileText, CheckCircle } from 'lucide-react';

const DashboardCards = () => {
  const stats = [
    {
      title: 'Total FRA Applications',
      value: '24,567',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Approved Claims',
      value: '18,423',
      change: '+8.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Active Villages',
      value: '3,162',
      change: '+5.2%',
      trend: 'up',
      icon: MapPin,
      color: 'bg-purple-500',
    },
    {
      title: 'Beneficiaries',
      value: '89,245',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>

            {/* Trend Info */}
            <div className="mt-4 flex items-center">
              <TrendIcon
                className={`w-4 h-4 mr-1 ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
