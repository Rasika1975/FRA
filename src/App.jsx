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
import Navbar from './components/Navbar';
import LayersPage from "./pages/LayersPage";
import ClaimsPage from "./pages/ClaimsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import ProtectedRoute from './components/ProtectedRoute'; 


const MainContent = () => {
  return (
    <div className="flex-1 flex flex-col transition-all duration-300">
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/layers" element={<LayersPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />

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
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Layout>
            <MainContent />
          </Layout>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
