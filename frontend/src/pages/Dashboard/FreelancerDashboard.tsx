import React, { useState, useEffect } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import FreelancerQuickActions from '../../components/dashboard/FreelancerQuickActions';
import JobOffersList from '../../components/dashboard/JobOffersList';
import MyJobsList from '../../components/dashboard/MyJobsList';
import { DollarSign, Star, Clock, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Project } from '../../types';

const FreelancerDashboard: React.FC = () => {
  const [earnings, setEarnings] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [myJobs, setMyJobs] = useState<Project[]>([]);
  const [jobOffers, setJobOffers] = useState<Project[]>([]);
  const freelancerId = 'freelancer-1';

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setJobOffers(response.data);
      } catch (error) {
        toast.error('Failed to fetch job offers');
        console.error('Fetch job offers error:', error);
      }
    };

    const fetchMyJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/freelancer/${freelancerId}`);
        setMyJobs(response.data);
        setActiveJobs(response.data.length);
      } catch (error) {
        toast.error('Failed to fetch my jobs');
        console.error('Fetch my jobs error:', error);
      }
    };

    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/freelancer/${freelancerId}/earnings`);
        setEarnings(response.data.totalEarnings);
      } catch (error) {
        toast.error('Failed to fetch earnings');
        console.error('Fetch earnings error:', error);
      }
    };

    fetchJobOffers();
    fetchMyJobs();
    fetchEarnings();
  }, [freelancerId]);

  const handleSubmitWork = async (jobId: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/projects/${jobId}/submit`);
      const completedJob = response.data;
      console.log('Submitted job:', completedJob);
      setMyJobs((prev) => prev.filter((j) => j.id !== jobId));
      setActiveJobs((prev) => prev - 1);
      // Refetch earnings to update total
      const earningsResponse = await axios.get(`http://localhost:5000/api/projects/freelancer/${freelancerId}/earnings`);
      setEarnings(earningsResponse.data.totalEarnings);
      toast.success('Work submitted successfully!');
    } catch (error: any) {
      console.error('Error submitting work:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        jobId,
      });
      toast.error('Failed to submit work');
    }
  };

  const handleUpdateAvailability = () => {
    toast.success('Availability updated!');
  };

  const handleViewMessages = () => {
    toast.success('Opening messages...');
  };

  const handleAcceptJob = async (jobId: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/projects/${jobId}/accept`, {
        freelancerId,
      });
      const acceptedJob = response.data;
      console.log('Accepted job:', acceptedJob);
      setMyJobs((prev) => [...prev, acceptedJob]);
      setJobOffers((prev) => prev.filter((job) => job.id !== jobId));
      setActiveJobs((prev) => prev + 1);
      toast.success('Job offer accepted!');
    } catch (error: any) {
      console.error('Error accepting job offer:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        jobId,
      });
      toast.error('Failed to accept job offer');
    }
  };

  const handleDeclineJob = (jobId: string) => {
    setJobOffers((prev) => prev.filter((job) => job.id !== jobId));
    toast.success('Job offer declined');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Freelancer Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your work overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Earnings This Month"
          value={`$${earnings.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          color="blue"
        />
        <StatCard
          title="Active Jobs"
          value={activeJobs.toString()}
          icon={<Clock size={24} />}
          color="green"
        />
        <StatCard
          title="Client Rating"
          value="4.8/5"
          icon={<Star size={24} />}
          color="purple"
        />
        <StatCard
          title="Completed Jobs"
          value="12"
          icon={<UserCheck size={24} />}
          color="orange"
        />
      </div>

      <FreelancerQuickActions
        onSubmitWork={handleSubmitWork}
        onUpdateAvailability={handleUpdateAvailability}
        onViewMessages={handleViewMessages}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobOffersList
          offers={jobOffers}
          onAccept={handleAcceptJob}
          onDecline={handleDeclineJob}
        />
        <MyJobsList jobs={myJobs} onSubmitWork={handleSubmitWork} />
      </div>
    </div>
  );
};

export default FreelancerDashboard;