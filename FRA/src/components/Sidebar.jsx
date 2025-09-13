import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  BarChart3,
  Info,
  User,
  Menu,
  X,
  Layers,
  FileText,
  PieChart,
} from "lucide-react";
import { useAuth } from "/src/hooks/useAuth.js";
import { useSidebar } from "/src/context/SidebarContext.jsx";

const Sidebar = () => {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile, closeMobile } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/", icon: BarChart3 },
    { name: "FRA Atlas", path: "/map", icon: MapPin },
    { name: "Layers", path: "/layers", icon: Layers },
    { name: "Claims", path: "/claims", icon: FileText },
    { name: "Analytics", path: "/analytics", icon: PieChart },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "About", path: "/about", icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobile}
          className="bg-white/80 backdrop-blur-md text-gray-700 hover:text-emerald-600 p-2 rounded-lg shadow-md transition-all duration-300"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 border-r border-gray-200 shadow-lg bg-white/90 backdrop-blur-md transition-all duration-300 flex flex-col
        ${isCollapsed ? "w-16" : "w-60"} 
        ${isMobileOpen ? "translate-x-0" : "lg:translate-x-0 -translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-3 flex items-center justify-between">
          {!isCollapsed ? (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">FRA Atlas</span>
               
              </div>
            </Link>
            
          ) : (
            <Link
              to="/"
              className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300"
            >
              <MapPin className="w-5 h-5 text-white" />
            </Link>
          )}

          {/* Collapse Button */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        {/* Main Section Label */}
        <div className="px-4 py-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Main</span>
        </div>


        {/* Navigation */}
        <div className="flex-1 p-1 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobile}
                className={`relative w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "bg-emerald-50 text-emerald-700 shadow-md"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
              >
                {isActive(item.path) && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-emerald-600 rounded-r-md"></span>
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="p-3 border-t border-gray-200 bg-white/90 backdrop-blur-md">
          {user ? (
            <div className="space-y-3">
              {!isCollapsed && (
                <div className="px-2 text-sm text-gray-700">
                  👋 Hello, <span className="font-semibold">{user.name}</span>
                </div>
              )}
              <button
                onClick={() => {
                  logout();
                  closeMobile();
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
