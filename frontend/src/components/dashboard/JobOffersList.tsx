import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Project } from '../../types';
import { format } from 'date-fns';

interface JobOffersListProps {
  offers: Project[];
  onAccept: (jobId: string) => void;
  onDecline: (jobId: string) => void;
}

const JobOffersList: React.FC<JobOffersListProps> = ({ offers, onAccept, onDecline }) => {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">New Job Offers</h2>
      {offers.length === 0 ? (
        <p className="text-gray-500">No new job offers available.</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-md font-medium text-gray-800">{offer.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Budget: ${offer.budget.toLocaleString()}</p>
                <p>Due: {format(new Date(offer.dueDate), 'MMM dd, yyyy')}</p>
              </div>
              <div className="mt-3 flex space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onAccept(offer.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDecline(offer.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default JobOffersList;