import { User, Project, DashboardSummary, Notification } from '../types';

export const mockClients: User[] = [
  {
    id: 'client-1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const mockFreelancers: User[] = [
  {
    id: 'freelancer-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'freelancer-2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    status: 'in-progress',
    dueDate: '2025-07-15',
    budget: 2500,
    clientId: 'client-1',
    freelancerId: 'freelancer-1',
    description: 'Redesign company website with modern UI/UX',
    createdAt: '2025-05-01',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    status: 'not-started',
    dueDate: '2025-09-30',
    budget: 8000,
    clientId: 'client-1',
    description: 'Create a mobile app for our product',
    createdAt: '2025-05-05',
  },
  {
    id: '3',
    name: 'Logo Design',
    status: 'completed',
    dueDate: '2025-04-15',
    budget: 500,
    clientId: 'client-1',
    freelancerId: 'freelancer-2',
    description: 'Design a new logo for company rebrand',
    createdAt: '2025-03-20',
  },
];

export const mockDashboardSummary: DashboardSummary = {
  totalSpend: 10500,
  activeProjects: 2,
  pendingReviews: 0,
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'New message from Alice Johnson',
    read: false,
    date: '2025-05-10T14:30:00',
    type: 'info',
  },
  {
    id: '2',
    message: 'Payment received for Website Redesign',
    read: false,
    date: '2025-05-09T10:15:00',
    type: 'success',
  },
  {
    id: '3',
    message: 'Project deadline approaching: Mobile App Development',
    read: true,
    date: '2025-05-08T09:00:00',
    type: 'warning',
  },
];