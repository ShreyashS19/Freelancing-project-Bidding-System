import React from 'react';
import { X } from 'lucide-react';

interface SkillsFilterProps {
  availableSkills: string[];
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({ 
  availableSkills, 
  selectedSkills, 
  toggleSkill 
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSkills = searchQuery 
    ? availableSkills.filter(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableSkills;

  // Get color for skill tags
  const getSkillColor = (skill: string) => {
    // Simple hash function to generate consistent colors
    const hash = skill.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-amber-100 text-amber-800',
      'bg-indigo-100 text-indigo-800',
      'bg-rose-100 text-rose-800',
    ];
    
    return colors[hash % colors.length];
  };

  return (
    <div>
      {/* Selected skills */}
      {selectedSkills.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Selected Skills:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map(skill => (
              <span 
                key={skill}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSkillColor(skill)}`}
              >
                {skill}
                <button 
                  onClick={() => toggleSkill(skill)}
                  className="ml-1.5 rounded-full hover:bg-white/20 p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Available skills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredSkills.map(skill => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? `${getSkillColor(skill)} shadow-sm`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          );
        })}
      </div>
      
      {filteredSkills.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No skills found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default SkillsFilter;