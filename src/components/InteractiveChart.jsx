import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

const InteractiveChart = ({ type, data, title, height = 300 }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // Animate chart data on mount
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const renderBarChart = () => {
    const maxValue = Math.max(...animatedData.map(item => item.value));
    
    return (
      <div className="flex items-end justify-between space-x-2 h-64 px-4">
        {animatedData.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center flex-1 group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative w-full flex justify-center mb-2">
              {hoveredIndex === index && (
                <div className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10 animate-fadeIn">
                  {item.label}: {item.value.toLocaleString()}
                </div>
              )}
              <div
                className={`w-full bg-gradient-to-t ${item.color || 'from-emerald-400 to-emerald-600'} rounded-t-md transition-all duration-700 ease-out transform ${
                  hoveredIndex === index ? 'scale-105 shadow-lg' : ''
                }`}
                style={{ 
                  height: `${(item.value / maxValue) * 200}px`,
                  minHeight: '20px'
                }}
              />
            </div>
            <span className="text-xs text-gray-600 text-center font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderPieChart = () => {
    const total = animatedData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {animatedData.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const radius = 80;
              const centerX = 100;
              const centerY = 100;
              
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle += angle;
              
              const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color || `hsl(${index * 60}, 70%, 60%)`}
                  className={`transition-all duration-300 cursor-pointer ${
                    hoveredIndex === index ? 'opacity-80 transform scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="ml-8 space-y-2">
          {animatedData.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-2 cursor-pointer transition-all duration-200 ${
                hoveredIndex === index ? 'transform scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 60%)` }}
              />
              <span className="text-sm text-gray-700">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...animatedData.map(item => item.value));
    const minValue = Math.min(...animatedData.map(item => item.value));
    const range = maxValue - minValue;
    
    return (
      <div className="h-64 px-4 py-4">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(percent => (
            <line
              key={percent}
              x1="0"
              y1={`${percent}%`}
              x2="100%"
              y2={`${percent}%`}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Line path */}
          <path
            d={animatedData.map((item, index) => {
              const x = (index / (animatedData.length - 1)) * 100;
              const y = 100 - ((item.value - minValue) / range) * 100;
              return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
            }).join(' ')}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="animate-drawLine"
          />
          
          {/* Data points */}
          {animatedData.map((item, index) => {
            const x = (index / (animatedData.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 100;
            
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill="#10b981"
                className={`cursor-pointer transition-all duration-200 ${
                  hoveredIndex === index ? 'r-6 fill-emerald-600' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-2">
          {animatedData.map((item, index) => (
            <span key={index} className="text-xs text-gray-600">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          {type === 'bar' && <BarChart3 className="w-5 h-5 text-gray-400" />}
          {type === 'pie' && <PieChart className="w-5 h-5 text-gray-400" />}
          {type === 'line' && <TrendingUp className="w-5 h-5 text-gray-400" />}
        </div>
      </div>
      
      <div style={{ height }}>
        {type === 'bar' && renderBarChart()}
        {type === 'pie' && renderPieChart()}
        {type === 'line' && renderLineChart()}
      </div>
    </div>
  );
};

export default InteractiveChart;