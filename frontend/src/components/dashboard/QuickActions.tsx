import React from 'react';
import { FileEdit, MessageCircle, CreditCard } from 'lucide-react';
import Button from '../ui/Button';

interface QuickActionsProps {
  onPostJob: () => void;
  onMessageFreelancer: () => void;
  onMakePayment: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onPostJob,
  onMessageFreelancer,
  onMakePayment,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="flex flex-col md:flex-row gap-3">
        <Button 
          variant="primary" 
          onClick={onPostJob}
          className="flex items-center justify-center"
        >
          <FileEdit size={18} className="mr-2" />
          Post a Job
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={onMessageFreelancer}
          className="flex items-center justify-center"
        >
          <MessageCircle size={18} className="mr-2" />
          Message Freelancer
        </Button>
        
        <Button 
          variant="success" 
          onClick={onMakePayment}
          className="flex items-center justify-center"
        >
          <CreditCard size={18} className="mr-2" />
          Make Payment
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;