import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, BarChart3, Home, Info, User, Menu, X } from 'lucide-react';
// ✅ Correct named import
import { useAuth } from '/src/hooks/useAuth.js';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'FRA Atlas', path: '/map', icon: MapPin },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button - only visible on mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white text-gray-700 hover:text-emerald-600 p-2 rounded-lg shadow-md transition-colors duration-200"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 shadow-lg fixed top-0 left-0 h-full z-50 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center transition-transform transform hover:scale-110">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">FRA Atlas</span>
                <span className="text-xs text-gray-500">Forest Rights Monitoring</span>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="flex items-center justify-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center transition-transform transform hover:scale-110">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-sm hidden lg:block"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        {/* Navigation */}
        <div className="p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 shadow-sm ${
                  isActive(item.path)
                    ? 'bg-emerald-50 text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {user ? (
            <div className="space-y-2">
              {!isCollapsed && (
                <div className="px-4 py-2 text-sm text-gray-700">Hello, {user.name}</div>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileOpen(false)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <User className="w-5 h-5" />
              {!isCollapsed && <span>Login</span>}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
