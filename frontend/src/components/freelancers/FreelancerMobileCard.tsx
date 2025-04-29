import React from 'react';
import { Calendar, DollarSign, Users, ChevronRight } from 'lucide-react';
import { Project } from '../../types/freelancers';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface FreelancerMobileCardProps {
  project: Project;
}

const FreelancerMobileCard: React.FC<FreelancerMobileCardProps> = ({ project }) => {
  // Calculate status based on due date
  const getStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Overdue', color: 'bg-red-100 text-red-800' };
    if (diffDays <= 7) return { label: 'Due Soon', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Upcoming', color: 'bg-emerald-100 text-emerald-800' };
  };

  const status = getStatus(project.dueDate);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{project.projectName}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <div>
              <span className="text-gray-500">Created: </span>
              <span className="text-gray-700">{formatDate(project.dateCreated)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <div>
              <span className="text-gray-500">Due: </span>
              <span className="text-gray-700">{formatDate(project.dueDate)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <DollarSign size={16} className="text-gray-400 mr-2" />
            <div>
              <span className="text-gray-500">Budget: </span>
              <span className="text-gray-700 font-medium">{formatCurrency(project.budget)}</span>
            </div>
          </div>
          
          <div className="flex items-start text-sm">
            <Users size={16} className="text-gray-400 mr-2 mt-1" />
            <div>
              <span className="text-gray-500">Applicants: </span>
              <span className="text-gray-700">{project.applicants.join(', ')}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {project.skills.map((skill) => (
              <span 
                key={skill} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-3">
        <button className="w-full text-sm text-blue-600 font-medium flex items-center justify-center hover:text-blue-800 transition-colors">
          View Details
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default FreelancerMobileCard;