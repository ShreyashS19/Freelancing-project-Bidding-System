import { useState, useMemo } from 'react';
import { Project } from '../types/freelancers';
// import { useFreelancerFilters } from "../hooks/useFreelancerFilters";


export const useFreelancerFilters = (projects: Project[]) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate list of all available skills from projects
  const availableSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    projects.forEach(project => {
      project.skills.forEach(skill => {
        skillsSet.add(skill);
      });
    });
    return Array.from(skillsSet).sort();
  }, [projects]);

  // Filter projects based on selected skills and search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Filter by skills
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => project.skills.includes(skill));
      
      // Filter by search term
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        project.projectName.toLowerCase().includes(searchLower) ||
        project.applicants.some(applicant => 
          applicant.toLowerCase().includes(searchLower)
        ) ||
        project.skills.some(skill => 
          skill.toLowerCase().includes(searchLower)
        );
      
      return matchesSkills && matchesSearch;
    });
  }, [projects, selectedSkills, searchTerm]);

  // Toggle a skill in the selected skills list
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSkills([]);
    setSearchTerm('');
  };

  return {
    selectedSkills,
    toggleSkill,
    availableSkills,
    filteredProjects,
    searchTerm,
    setSearchTerm,
    clearFilters
  };
};