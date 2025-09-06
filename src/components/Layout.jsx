import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isCollapsed } = useSidebar();
  
  // Routes that should not show sidebar and navbar
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  if (isAuthRoute) {
    // For auth pages, render only the children without sidebar/navbar
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  // For all other pages, render with sidebar and navbar
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div 
        className={`flex flex-col transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-60'
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
