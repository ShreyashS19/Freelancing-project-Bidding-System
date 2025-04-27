import React from 'react';
import { Send, Clock, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';

interface FreelancerQuickActionsProps {
  onSubmitWork: () => void;
  onUpdateAvailability: () => void;
  onViewMessages: () => void;
}

const FreelancerQuickActions: React.FC<FreelancerQuickActionsProps> = ({
  onSubmitWork,
  onUpdateAvailability,
  onViewMessages,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="flex flex-col md:flex-row gap-3">
        <Button 
          variant="primary" 
          onClick={onSubmitWork}
          className="flex items-center justify-center"
        >
          <Send size={18} className="mr-2" />
          Submit Work
        </Button>
        
        <Button 
          variant="success" 
          onClick={onUpdateAvailability}
          className="flex items-center justify-center"
        >
          <Clock size={18} className="mr-2" />
          Update Availability
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={onViewMessages}
          className="flex items-center justify-center"
        >
          <MessageCircle size={18} className="mr-2" />
          Messages
        </Button>
      </div>
    </div>
  );
};

export default FreelancerQuickActions;