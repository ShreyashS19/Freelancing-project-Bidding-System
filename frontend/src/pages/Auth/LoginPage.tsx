import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, Users } from 'lucide-react';
import Button from '../../components/ui/Button';

interface LoginPageProps {
  isAuthenticated: boolean;
  onLogin: (role: 'client' | 'freelancer') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isAuthenticated, onLogin }) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'client' | 'freelancer' | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRoleSelect = (role: 'client' | 'freelancer') => {
    setSelectedRole(role);
    setIsAnimating(true);
    
    // Simulate login after animation
    setTimeout(() => {
      onLogin(role);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full transition-all duration-500 ease-in-out ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left section - Welcome message */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 md:w-1/2">
            <h1 className="text-3xl font-bold mb-6">Welcome to FreelanceHub</h1>
            <p className="text-blue-100 mb-8">
              The platform that connects talented freelancers with clients looking for quality work. Choose your role to get started.
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
                  <p className="text-sm text-blue-100">Hire talented professionals for your projects</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right section - Role selection */}
          <div className="p-8 md:w-1/2">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Choose your role</h2>
            
            <div className="space-y-4">
              <div 
                className={`border-2 rounded-lg p-6 flex items-center cursor-pointer transition-all duration-200 ${
                  selectedRole === 'client' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onClick={() => handleRoleSelect('client')}
              >
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <BriefcaseBusiness size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">Login as Client</h3>
                  <p className="text-gray-600">Post jobs and hire freelancers</p>
                </div>
              </div>
              
              <div 
                className={`border-2 rounded-lg p-6 flex items-center cursor-pointer transition-all duration-200 ${
                  selectedRole === 'freelancer' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
                onClick={() => handleRoleSelect('freelancer')}
              >
                <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                  <Users size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">Login as Freelancer</h3>
                  <p className="text-gray-600">Find work and showcase your skills</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Don't have an account?</p>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;