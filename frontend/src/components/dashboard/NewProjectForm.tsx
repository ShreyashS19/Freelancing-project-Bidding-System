import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

interface NewProjectFormProps {
  onSubmit?: (project: { name: string; status: string; dueDate: string }) => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'not-started',
    dueDate: '',
    budget: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.budget || isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Valid budget is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const projectData = {
        name: formData.name,
        status: formData.status,
        dueDate: formData.dueDate,
        budget: parseFloat(formData.budget),
        clientId: 'client-1',
        description: formData.description,
      };

      console.log(projectData)

      await axios.post('http://localhost:5000/api/projects', projectData);
      toast.success('Project created successfully!');

      setFormData({
        name: '',
        status: 'not-started',
        dueDate: '',
        budget: '',
        description: '',
      });

      if (onSubmit) {
        onSubmit({
          name: formData.name,
          status: formData.status,
          dueDate: formData.dueDate,
        });
      }
    } catch (error) {
      toast.error('Failed to create project');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Card className="sticky top-6">
      <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
          required
          error={errors.name}
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
          required
        />
        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
          error={errors.dueDate}
        />
        <Input
          label="Budget ($)"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter budget"
          required
          error={errors.budget}
        />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            rows={4}
            placeholder="Enter project description"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </Card>
  );
};

export default NewProjectForm;