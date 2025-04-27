import React from 'react';
import { format } from 'date-fns';
import Button from '../ui/Button';
import { Project } from '../../types';

interface JobOffersListProps {
  offers: Project[];
  onAccept: (jobId: string) => void;
  onDecline: (jobId: string) => void;
}

const JobOffersList: React.FC<JobOffersListProps> = ({ offers, onAccept, onDecline }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">New Job Offers</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {offers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No new job offers available.
          </div>
        ) : (
          offers.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{job.name}</h3>
                  <p className="text-sm text-gray-600">from Client</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${job.budget.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    Due: {format(new Date(job.dueDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="flex gap-3">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onAccept(job.id)}
                >
                  Accept Offer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDecline(job.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobOffersList;