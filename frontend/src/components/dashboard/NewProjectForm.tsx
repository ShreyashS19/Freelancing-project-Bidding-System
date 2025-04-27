import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';

interface NewProjectFormProps {
  onSubmit: (project: {
    name: string;
    status: string;
    dueDate: string;
    budget: number;
  }) => void;
}

const statusOptions = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('not-started');
  const [dueDate, setDueDate] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: projectName,
      status,
      dueDate,
      budget: parseFloat(budget) || 0,
    });
    setProjectName('');
    setStatus('not-started');
    setDueDate('');
    setBudget('');
    toast.success('Project created successfully!');
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Project</h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Project Name"
          name="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          required
        />
        
        <Select
          label="Status"
          name="status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        
        <Input
          label="Budget"
          name="budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter project budget"
          required
        />
        
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <Button type="submit" variant="success" size="md" className="mt-2">
          Add Project
        </Button>
      </form>
    </Card>
  );
};

export default NewProjectForm;