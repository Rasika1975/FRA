import React from "react";
import { Link } from "react-router-dom";
import {
  FiMessageCircle,
  FiActivity,
  FiBook,
  FiUsers,
  FiCalendar,
  FiHeart,
  FiBell,
  FiSettings,
  FiTrendingUp,
  FiTarget,
  FiCheck,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  const userStats = {
    name: "Team Elite",
    streak: 7,
    moodScore: 8.2,
    sessionsCompleted: 12,
    goalsAchieved: 5,
  };
  const notifications = [];
  return (
    // Dashboard Header
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
            <FiHeart className="text-white text-xs" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Welcome back, {userStats.name}!
            </h1>
            <p className="text-xs text-gray-500">
              Here's your mental health overview
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <button className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
            <FiBell className="text-base" />
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
            <FiSettings className="text-base" />
          </button>
          {/* Login Button */}
          <Link to="/login" className="p-0.5 rounded-md hover:bg-blue-50 transition">
            <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-sm ring-1 ring-white/40">
              <FiUser className="text-white text-xs" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
