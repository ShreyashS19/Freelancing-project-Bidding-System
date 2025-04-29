import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">Welcome to your client dashboard. Navigate to the Freelancers page to view and filter through available freelancers.</p>
      </div>
    </div>
  );
};

export default Dashboard;