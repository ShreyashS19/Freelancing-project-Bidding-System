import React from 'react';
import Card from '../ui/Card';
import { Project } from '../../types';
import { format } from 'date-fns';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">My Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects available.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-md font-medium text-gray-800">{project.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Budget: ${project.budget.toLocaleString()}</p>
                <p>Due: {format(new Date(project.dueDate), 'MMM dd, yyyy')}</p>
                <p>Status: {project.status.replace('-', ' ').toUpperCase()}</p>
                <p>Freelancer: {project.freelancerId || 'Not assigned'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ProjectList;