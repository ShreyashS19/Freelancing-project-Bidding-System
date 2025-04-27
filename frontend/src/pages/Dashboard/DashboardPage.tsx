import React, { useState, useEffect } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import NewProjectForm from '../../components/dashboard/NewProjectForm';
import ActiveProjectsList from '../../components/dashboard/ActiveProjectsList';
import { Project } from '../../types';
import { DollarSign, Briefcase, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const clientId = 'client-1'; // Hardcoded for demo; replace with auth user ID
  const [totalSpend, setTotalSpend] = useState(0);
  const [activeProjectsCount, setActiveProjectsCount] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0); // No review system, keep as 0

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/client/${clientId}`);
        const fetchedProjects = response.data;
        setProjects(fetchedProjects);

        // Calculate stats
        const spend = fetchedProjects.reduce((sum: number, project: Project) => sum + project.budget, 0);
        const activeCount = fetchedProjects.filter((project: Project) =>
          ['not-started', 'in-progress'].includes(project.status)
        ).length;
        setTotalSpend(spend);
        setActiveProjectsCount(activeCount);
        setPendingReviews(0);
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
        const fetchedProjects = response.data;
        setProjects(fetchedProjects);

        // Update stats
        const spend = fetchedProjects.reduce((sum: number, project: Project) => sum + project.budget, 0);
        const activeCount = fetchedProjects.filter((project: Project) =>
          ['not-started', 'in-progress'].includes(project.status)
        ).length;
        setTotalSpend(spend);
        setActiveProjectsCount(activeCount);
      } catch (error) {
        console.error('Fetch projects error:', error);
      }
    };
    fetchProjects();
  };

  const handlePostJob = () => {
    console.log('Post a job clicked');
    toast.success('Post a job clicked');
  };

  const handleMessageFreelancer = () => {
    console.log('Message freelancer clicked');
    toast.success('Message freelancer clicked');
  };

  const handleMakePayment = () => {
    console.log('Make payment clicked');
    toast.success('Make payment clicked');
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
          value={`$${totalSpend.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          color="blue"
        />
        <StatCard
          title="Active Projects"
          value={activeProjectsCount.toString()}
          icon={<Briefcase size={24} />}
          color="green"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingReviews.toString()}
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
          <NewProjectForm onSubmit={handleNewProject} />
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