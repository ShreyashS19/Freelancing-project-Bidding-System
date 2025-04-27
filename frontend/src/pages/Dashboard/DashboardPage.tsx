import React, { useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import NewProjectForm from '../../components/dashboard/NewProjectForm';
import ActiveProjectsList from '../../components/dashboard/ActiveProjectsList';
import { Project } from '../../types';
import { DollarSign, Briefcase, Star } from 'lucide-react';

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    status: 'in-progress',
    dueDate: '2025-07-15',
    budget: 2500,
    clientId: 'client-1',
    freelancerId: 'freelancer-1',
    description: 'Redesign company website with modern UI/UX',
    createdAt: '2025-05-01',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    status: 'not-started',
    dueDate: '2025-09-30',
    budget: 8000,
    clientId: 'client-1',
    description: 'Create a mobile app for our product',
    createdAt: '2025-05-05',
  },
];

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  const handleAddProject = (project: { name: string; status: string; dueDate: string }) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: project.name,
      status: project.status as 'not-started' | 'in-progress' | 'completed' | 'cancelled',
      dueDate: project.dueDate,
      budget: 0, // Default budget, would be set in a real form
      clientId: 'client-1',
      description: '',
      createdAt: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
  };

  const handlePostJob = () => {
    // This would open a modal or navigate to post job page
    console.log('Post a job clicked');
  };

  const handleMessageFreelancer = () => {
    // This would open messages or navigate to messages page
    console.log('Message freelancer clicked');
  };

  const handleMakePayment = () => {
    // This would open payment modal
    console.log('Make payment clicked');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Spend" 
          value="$10,500" 
          icon={<DollarSign size={24} />} 
          color="blue" 
        />
        <StatCard 
          title="Active Projects" 
          value="2" 
          icon={<Briefcase size={24} />} 
          color="green" 
        />
        <StatCard 
          title="Pending Reviews" 
          value="0" 
          icon={<Star size={24} />} 
          color="purple" 
        />
      </div>

      {/* Quick Actions */}
      <QuickActions 
        onPostJob={handlePostJob}
        onMessageFreelancer={handleMessageFreelancer}
        onMakePayment={handleMakePayment}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Project Form */}
        <div className="lg:col-span-1">
          <NewProjectForm onSubmit={handleAddProject} />
        </div>

        {/* Active Projects */}
        <div className="lg:col-span-2">
          <ActiveProjectsList projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;