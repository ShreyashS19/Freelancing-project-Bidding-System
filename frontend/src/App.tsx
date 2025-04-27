import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import FreelancerDashboard from './pages/Dashboard/FreelancerDashboard';
import ProjectsPage from './pages/Projects/ProjectsPage';
import { mockClients, mockFreelancers } from './data/mockData';
import { User } from './types';
import { Toaster } from 'react-hot-toast';
import ClientDashboard from './pages/Dashboard/ClientDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (role: 'client' | 'freelancer') => {
    if (role === 'client') {
      setCurrentUser(mockClients[0]);
    } else {
      setCurrentUser(mockFreelancers[0]);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LoginPage isAuthenticated={isAuthenticated} onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage isAuthenticated={isAuthenticated} onLogin={handleLogin} />} />
        
        {/* Protected routes */}
        {isAuthenticated && currentUser ? (
          <Route element={<Layout user={currentUser} onLogout={handleLogout} />}>
            <Route 
              path="/dashboard" 
              element={
                currentUser.role === 'client' ? <DashboardPage /> : <FreelancerDashboard />
              } 
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/freelancers" element={<div className="p-6">Freelancers Page</div>} />
            <Route path="/messages" element={<div className="p-6">Messages Page</div>} />
            <Route path="/reports" element={<div className="p-6">Reports Page</div>} />
            <Route path="/post-job" element={<div className="p-6">Post a Job Page</div>} />
            <Route path="/settings" element={<div className="p-6">Settings Page</div>} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;