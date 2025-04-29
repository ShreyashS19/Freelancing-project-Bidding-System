import React from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { Project } from '../../types/freelancers';
import FreelancerMobileCard from './FreelancerMobileCard';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface FreelancerTableProps {
  projects: Project[];
}

const FreelancerTable: React.FC<FreelancerTableProps> = ({ projects }) => {
  const [sortColumn, setSortColumn] = React.useState<keyof Project>('dateCreated');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const handleSort = (column: keyof Project) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortColumn === 'budget') {
      return sortDirection === 'asc' 
        ? a.budget - b.budget 
        : b.budget - a.budget;
    }
    
    if (sortColumn === 'projectName' || sortColumn === 'applicants') {
      const aValue = sortColumn === 'applicants' 
        ? a.applicants.join(', ') 
        : a[sortColumn];
      const bValue = sortColumn === 'applicants' 
        ? b.applicants.join(', ') 
        : b[sortColumn];
        
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // For dates
    const aDate = new Date(a[sortColumn as 'dateCreated' | 'dueDate']);
    const bDate = new Date(b[sortColumn as 'dateCreated' | 'dueDate']);
    
    return sortDirection === 'asc'
      ? aDate.getTime() - bDate.getTime()
      : bDate.getTime() - aDate.getTime();
  });

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

  const SortIcon = ({ column }: { column: keyof Project }) => {
    if (sortColumn !== column) return <ChevronDown size={16} className="opacity-30" />;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div>
      {/* Mobile view - cards */}
      <div className="md:hidden space-y-4">
        {sortedProjects.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">No projects found with the selected filters.</p>
          </div>
        ) : (
          sortedProjects.map(project => (
            <FreelancerMobileCard key={project.id} project={project} />
          ))
        )}
      </div>
      
      {/* Desktop view - table */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort('projectName')}
                    >
                      <span>Project Name</span>
                      <SortIcon column="projectName" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort('dateCreated')}
                    >
                      <span>Date Created</span>
                      <SortIcon column="dateCreated" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort('dueDate')}
                    >
                      <span>Due Date</span>
                      <SortIcon column="dueDate" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort('budget')}
                    >
                      <span>Budget</span>
                      <SortIcon column="budget" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort('applicants')}
                    >
                      <span>Applicants</span>
                      <SortIcon column="applicants" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                      No projects found with the selected filters.
                    </td>
                  </tr>
                ) : (
                  sortedProjects.map((project) => {
                    const status = getStatus(project.dueDate);
                    return (
                      <tr 
                        key={project.id} 
                        className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(project.dateCreated)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(project.dueDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(project.budget)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{project.applicants.join(', ')}</div>
                        </td>
                        <td className="px-6 py-4">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {projects.length > 0 && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{sortedProjects.length}</span> of <span className="font-medium">{projects.length}</span> projects
              </div>
              <div className="flex-1 flex justify-end">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerTable;