import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AnimatedCard = ({ title, value, change, trend, icon: Icon, color, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
        isHovered ? 'scale-105' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center transform transition-transform duration-300 ${
            isHovered ? 'rotate-6 scale-110' : ''
          }`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        {trend === 'up' ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
      
      {/* Animated progress bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-2 bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ 
            width: isHovered ? '100%' : '70%',
            transform: `translateX(${isHovered ? '0%' : '-30%'})`
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedCard;