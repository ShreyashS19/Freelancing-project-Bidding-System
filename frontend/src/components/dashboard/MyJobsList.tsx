import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Project } from '../../types';
import { format } from 'date-fns';

interface MyJobsListProps {
  jobs: Project[];
  onSubmitWork: (jobId: string) => void;
}

const MyJobsList: React.FC<MyJobsListProps> = ({ jobs, onSubmitWork }) => {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">My Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No active jobs.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-md font-medium text-gray-800">{job.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Budget: ${job.budget.toLocaleString()}</p>
                <p>Due: {format(new Date(job.dueDate), 'MMM dd, yyyy')}</p>
                <p>Status: {job.status.replace('-', ' ').toUpperCase()}</p>
              </div>
              <div className="mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onSubmitWork(job.id)}
                >
                  Submit Work
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MyJobsList;