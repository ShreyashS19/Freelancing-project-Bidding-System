import React, { useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import FreelancerQuickActions from '../../components/dashboard/FreelancerQuickActions';
import JobOffersList from '../../components/dashboard/JobOffersList';
import MyJobsList from '../../components/dashboard/MyJobsList';
import { DollarSign, Star, Clock, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const FreelancerDashboard: React.FC = () => {
  const [earnings, setEarnings] = useState(3500);
  const [activeJobs, setActiveJobs] = useState(3);
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [jobOffers, setJobOffers] = useState<any[]>([]);

  const handleSubmitWork = (jobId: string) => {
    const job = myJobs.find(j => j.id === jobId);
    if (job) {
      setEarnings(prev => prev + job.budget);
      setActiveJobs(prev => prev - 1);
      toast.success('Work submitted successfully!');
    }
  };

  const handleUpdateAvailability = () => {
    toast.success('Availability updated!');
  };

  const handleViewMessages = () => {
    toast.success('Opening messages...');
  };

  const handleAcceptJob = (jobId: string) => {
    const acceptedJob = jobOffers.find(job => job.id === jobId);
    if (acceptedJob) {
      setMyJobs(prev => [...prev, acceptedJob]);
      setJobOffers(prev => prev.filter(job => job.id !== jobId));
      setActiveJobs(prev => prev + 1);
      toast.success('Job offer accepted!');
    }
  };

  const handleDeclineJob = (jobId: string) => {
    setJobOffers(prev => prev.filter(job => job.id !== jobId));
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
        <MyJobsList 
          jobs={myJobs}
          onSubmitWork={handleSubmitWork}
        />
      </div>
    </div>
  );
};

export default FreelancerDashboard;