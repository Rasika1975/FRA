import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import ForestOfficerDashboard from './pages/ForestOfficerDashboard';
import DataAnalystDashboard from './pages/DataAnalystDashboard';
import DistrictCoordinatorDashboard from './pages/DistrictCoordinatorDashboard';
import PublicDashboard from './pages/PublicDashboard';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

import ProtectedRoute from './components/ProtectedRoute';

// Main Content Component that uses sidebar context
const MainContent = () => {
  const { isCollapsed } = useSidebar();
  
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 flex flex-col lg:ml-64">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<DashboardPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />

          {/* General Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

                {/* Role-Based Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forest-officer"
                  element={
                    <ProtectedRoute allowedRoles={['officer']}>
                      <ForestOfficerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyst"
                  element={
                    <ProtectedRoute allowedRoles={['analyst']}>
                      <DataAnalystDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/coordinator"
                  element={
                    <ProtectedRoute allowedRoles={['coordinator']}>
                      <DistrictCoordinatorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/public"
                  element={
                    <ProtectedRoute allowedRoles={['public']}>
                      <PublicDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
