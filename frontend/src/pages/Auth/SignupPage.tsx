import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'client' | 'freelancer' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'freelancer',
    skills: '',
    bio: '',
    portfolioLink: '',
    city: '',
    country: '',
    avatar: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    try {
      const payload = {
        name: formData.name || '',
        email: formData.email || '',
        password: formData.password || '',
        role: selectedRole || 'freelancer',
        skills: formData.skills ? formData.skills.split(',').map((s) => s.trim()) : [],
        bio: formData.bio || '',
        portfolioLink: formData.portfolioLink || '',
        location: {
          city: formData.city || '',
          country: formData.country || '',
        },
        avatar: formData.avatar || '',
      };

      const response = await axios.post('http://localhost:5000/api/auth/register', payload);
      console.log('Signup response:', response.data);
      login(response.data.token, response.data.user);
      toast.success('Account created successfully!');
      setIsAnimating(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full transition-all duration-500 ease-in-out ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {!selectedRole ? (
          <div className="flex flex-col md:flex-row">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 md:w-1/2">
              <h1 className="text-3xl font-bold mb-6">Join FreelanceHub</h1>
              <p className="text-blue-100 mb-8">
                Create an account to start connecting with clients or freelancers.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Users size={20} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">For Freelancers</h3>
                    <p className="text-sm text-blue-100">Find projects that match your skills</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full">
                    <BriefcaseBusiness size={20} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">For Clients</h3>
                    <p className="text-sm text-blue-100">Hire talented professionals</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 md:w-1/2">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Choose your role</h2>
              <div className="space-y-4">
                <div
                  className={`border-2 rounded-lg p-6 flex items-center cursor-pointer transition-all duration-200 ${
                    selectedRole === 'client'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                  onClick={() => setSelectedRole('client')}
                >
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <BriefcaseBusiness size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Sign up as Client</h3>
                    <p className="text-gray-600">Post jobs and hire freelancers</p>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-lg p-6 flex items-center cursor-pointer transition-all duration-200 ${
                    selectedRole === 'freelancer'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                  onClick={() => setSelectedRole('freelancer')}
                >
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                    <Users size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Sign up as Freelancer</h3>
                    <p className="text-gray-600">Find work and showcase your skills</p>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <p className="text-gray-600 mb-4">Already have an account?</p>
                  <Button variant="outline" size="md" onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
              Create your {selectedRole} account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="role" value={selectedRole} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
              {selectedRole === 'freelancer' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Skills or Services Offered (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g., Web Development, UI/UX Design"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Short Bio or Tagline</label>
                    <input
                      type="text"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Portfolio Link (optional)</label>
                    <input
                      type="text"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City (optional)</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country (optional)</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture URL (optional)</label>
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                </>
              )}
              <Button type="submit" variant="primary" fullWidth>
                Create Account
              </Button>
            </form>
            <div className="text-center mt-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedRole(null)}>
                Back to Role Selection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;