import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

const ChartPanel = () => {
  const stateData = [
    { state: 'Madhya Pradesh', count: 12450, percentage: 78, color: 'bg-emerald-500' },
    { state: 'Odisha', count: 6780, percentage: 45, color: 'bg-blue-500' },
    { state: 'Telangana', count: 3890, percentage: 28, color: 'bg-purple-500' },
    { state: 'Tripura', count: 1447, percentage: 15, color: 'bg-orange-500' },
  ];

  const trendData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 71 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 88 },
  ];

  return React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6' },

    // FRA Applications by State
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
      React.createElement('div', { className: 'flex items-center justify-between mb-6' },
        React.createElement('h3', { className: 'text-lg font-semibold text-gray-900' }, 'FRA Applications by State'),
        React.createElement(BarChart3, { className: 'w-5 h-5 text-gray-400' })
      ),
      React.createElement('div', { className: 'space-y-4' },
        stateData.map(function(item, index) {
          return React.createElement('div', { key: index, className: 'flex items-center space-x-3' },
            React.createElement('div', { className: 'w-20 text-sm text-gray-600' }, item.state),
            React.createElement('div', { className: 'flex-1 bg-gray-200 rounded-full h-3' },
              React.createElement('div', {
                className: item.color + ' h-3 rounded-full transition-all duration-300',
                style: { width: item.percentage + '%' }
              })
            ),
            React.createElement('div', { className: 'w-16 text-sm font-medium text-gray-900 text-right' }, item.count.toLocaleString())
          );
        })
      )
    ),

    // Approval Status
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
      React.createElement('div', { className: 'flex items-center justify-between mb-6' },
        React.createElement('h3', { className: 'text-lg font-semibold text-gray-900' }, 'Approval Status'),
        React.createElement(PieChart, { className: 'w-5 h-5 text-gray-400' })
      ),
      React.createElement('div', { className: 'space-y-4' },
        React.createElement('div', { className: 'text-center' },
          React.createElement('div', { className: 'relative inline-flex items-center justify-center w-32 h-32 mb-4' },
            React.createElement('div', { className: 'absolute inset-0 bg-emerald-500 rounded-full', style: { clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' } }),
            React.createElement('div', { className: 'absolute inset-0 bg-blue-500 rounded-full', style: { clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' } }),
            React.createElement('div', { className: 'absolute inset-0 bg-orange-500 rounded-full', style: { clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)' } }),
            React.createElement('div', { className: 'relative text-lg font-bold text-gray-900' }, '75%')
          )
        ),
        React.createElement('div', { className: 'space-y-2' },
          React.createElement('div', { className: 'flex items-center justify-between' },
            React.createElement('div', { className: 'flex items-center space-x-2' },
              React.createElement('div', { className: 'w-3 h-3 bg-emerald-500 rounded-full' }),
              React.createElement('span', { className: 'text-sm text-gray-600' }, 'Approved')
            ),
            React.createElement('span', { className: 'text-sm font-medium text-gray-900' }, '18,423 (75%)')
          ),
          React.createElement('div', { className: 'flex items-center justify-between' },
            React.createElement('div', { className: 'flex items-center space-x-2' },
              React.createElement('div', { className: 'w-3 h-3 bg-blue-500 rounded-full' }),
              React.createElement('span', { className: 'text-sm text-gray-600' }, 'Pending')
            ),
            React.createElement('span', { className: 'text-sm font-medium text-gray-900' }, '4,321 (18%)')
          ),
          React.createElement('div', { className: 'flex items-center justify-between' },
            React.createElement('div', { className: 'flex items-center space-x-2' },
              React.createElement('div', { className: 'w-3 h-3 bg-orange-500 rounded-full' }),
              React.createElement('span', { className: 'text-sm text-gray-600' }, 'Rejected')
            ),
            React.createElement('span', { className: 'text-sm font-medium text-gray-900' }, '1,823 (7%)')
          )
        )
      )
    ),

    // Monthly Trend
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6 lg:col-span-2' },
      React.createElement('div', { className: 'flex items-center justify-between mb-6' },
        React.createElement('h3', { className: 'text-lg font-semibold text-gray-900' }, 'Application Trend (Last 6 Months)'),
        React.createElement(TrendingUp, { className: 'w-5 h-5 text-gray-400' })
      ),
      React.createElement('div', { className: 'h-48 flex items-end justify-between space-x-2' },
        trendData.map(function(item, index) {
          return React.createElement('div', { key: index, className: 'flex flex-col items-center flex-1' },
            React.createElement('div', {
              className: 'w-full bg-emerald-500 rounded-t-md transition-all duration-300 hover:bg-emerald-600',
              style: { height: item.value + '%' }
            }),
            React.createElement('span', { className: 'text-xs text-gray-600 mt-2' }, item.month)
          );
        })
      )
    )
  );
};

export default ChartPanel;
