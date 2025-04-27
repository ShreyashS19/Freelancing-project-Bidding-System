export interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client';
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'cancelled';
  dueDate: string;
  budget: number;
  clientId: string;
  freelancerId?: string;
  description: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalSpend: number;
  activeProjects: number;
  pendingReviews: number;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  date: string;
  type: 'info' | 'warning' | 'success' | 'error';
}