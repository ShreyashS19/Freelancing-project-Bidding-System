import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import FreelancerDashboard from './pages/Dashboard/FreelancerDashboard';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        element={
          isAuthenticated ? (
            <Layout isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={
          user?.role === 'client' ? <DashboardPage /> : <FreelancerDashboard />
        } />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/freelancers" element={<div>Freelancers Page (TBD)</div>} />
        <Route path="/messages" element={<div>Messages Page (TBD)</div>} />
        <Route path="/reports" element={<div>Reports Page (TBD)</div>} />
        <Route path="/post-job" element={<div>Post Job Page (TBD)</div>} />
        <Route path="/settings" element={<div>Settings Page (TBD)</div>} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;