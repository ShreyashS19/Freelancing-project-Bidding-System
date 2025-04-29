import React from 'react';
import { Filter } from 'lucide-react';
import FreelancerTable from '../components/freelancers/FreelancerTable';
import SkillsFilter from '../components/freelancers/SkillsFilter';
import { useFreelancerFilters } from '../hooks/useFreelancerFilters';
import { Project } from '../types/freelancers';
import { mockProjects } from '../data/mockData';

const FreelancersPage: React.FC = () => {
  const { 
    selectedSkills, 
    toggleSkill, 
    filteredProjects,
    availableSkills,
    searchTerm,
    setSearchTerm,
    clearFilters
  } = useFreelancerFilters(mockProjects);

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Freelancers</h1>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Filter size={16} className="mr-2" />
            Filter
            {selectedSkills.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                {selectedSkills.length}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">Filter by Skills</h2>
            {selectedSkills.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            )}
          </div>
          <SkillsFilter 
            availableSkills={availableSkills} 
            selectedSkills={selectedSkills} 
            toggleSkill={toggleSkill} 
          />
        </div>
      )}
      
      <FreelancerTable projects={filteredProjects} />
    </div>
  );
};

export default FreelancersPage;