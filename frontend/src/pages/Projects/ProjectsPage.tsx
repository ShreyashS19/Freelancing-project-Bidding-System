import React from 'react';
import { Project } from '../../types';
import { FileText, Clock, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { format } from 'date-fns';

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
  {
    id: '3',
    name: 'Logo Design',
    status: 'completed',
    dueDate: '2025-04-15',
    budget: 500,
    clientId: 'client-1',
    freelancerId: 'freelancer-2',
    description: 'Design a new logo for company rebrand',
    createdAt: '2025-03-20',
  },
];

const ProjectsPage: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started':
        return <Clock size={16} className="text-blue-500" />;
      case 'in-progress':
        return <Clock size={16} className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not-started':
        return 'Not Started';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'not-started':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600">Manage all your projects in one place</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <FileText size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            All Projects
          </Button>
          <Button variant="outline" size="sm">In Progress</Button>
          <Button variant="outline" size="sm">Not Started</Button>
          <Button variant="outline" size="sm">Completed</Button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1">{getStatusText(project.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(project.dueDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;