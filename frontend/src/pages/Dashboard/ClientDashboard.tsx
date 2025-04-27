import React, { useState, useEffect } from 'react';
import NewProjectForm from '../../components/dashboard/NewProjectForm';
import ProjectList from '../../components/dashboard/ProjectList';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Project } from '../../types';

const ClientDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const clientId = 'client-1'; // Hardcoded for demo; replace with auth user ID

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/client/${clientId}`);
        setProjects(response.data);
      } catch (error) {
        toast.error('Failed to fetch projects');
        console.error('Fetch projects error:', error);
      }
    };

    fetchProjects();
  }, [clientId]);

  const handleNewProject = () => {
    // Refetch projects after adding a new one
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/client/${clientId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Fetch projects error:', error);
      }
    };
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
        <p className="text-gray-600">Manage your projects and track progress.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <NewProjectForm onSubmit={handleNewProject} />
        </div>
        <div className="lg:col-span-2">
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;