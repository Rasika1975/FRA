import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import Layout from './components/Layout';
import RegisterPage from './components/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import ForestOfficerDashboard from './pages/ForestOfficerDashboard';
import DataAnalystDashboard from './pages/DataAnalystDashboard';
import DistrictCoordinatorDashboard from './pages/DistrictCoordinatorDashboard';
import PublicDashboard from './pages/PublicDashboard';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

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
          </Layout>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
