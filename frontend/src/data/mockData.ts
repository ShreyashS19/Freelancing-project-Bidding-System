import { Project } from '../types/freelancers';

// Generate a list of skills for the mock data
const skillsList = [
  'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 
  'UI/UX Design', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 
  'AWS', 'Azure', 'Docker', 'GraphQL', 'REST API', 'MongoDB',
  'PostgreSQL', 'MySQL', 'Redis', 'Flutter', 'React Native',
  'Swift', 'Kotlin', 'Angular', 'Vue.js', 'WordPress', 'SEO',
  'Content Writing', 'Digital Marketing', 'Figma', 'Adobe XD',
  'Photoshop', 'Illustrator', 'Unity', 'Game Development',
  'Machine Learning', 'Data Science', 'Blockchain', 'DevOps'
];

// Generate random date within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Format date to ISO string
const formatDateForMock = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Generate random budget
const randomBudget = () => {
  return Math.floor(Math.random() * 15 + 5) * 1000; // $5,000 to $20,000
};

// Generate random subset of skills
const randomSkills = () => {
  const shuffled = [...skillsList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 2); // 2-6 skills
};

// Generate random applicants
const applicantNames = [
  'John Smith', 'Emily Johnson', 'Michael Brown', 'Jessica Davis',
  'David Wilson', 'Sarah Martinez', 'Robert Taylor', 'Jennifer Anderson',
  'William Thomas', 'Lisa Jackson', 'Daniel White', 'Margaret Harris',
  'James Martin', 'Nancy Thompson', 'Charles Garcia', 'Karen Robinson',
  'Joseph Clark', 'Susan Rodriguez', 'Thomas Lewis', 'Betty Walker'
];

const randomApplicants = () => {
  const shuffled = [...applicantNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1); // 1-3 applicants
};

// Project names
const projectNames = [
  'E-commerce Website Redesign',
  'Mobile App Development',
  'Brand Identity Overhaul',
  'Content Management System',
  'Digital Marketing Campaign',
  'SEO Optimization Project',
  'Custom CRM Implementation',
  'Data Analytics Dashboard',
  'Social Media Integration',
  'Video Production Series',
  'API Development',
  'Database Migration',
  'UI/UX Enhancement',
  'Cloud Migration Strategy',
  'Blockchain Implementation',
  'WordPress Plugin Development',
  'React Native Mobile App',
  'Machine Learning Integration',
  'DevOps Pipeline Setup',
  'Unity Game Development'
];

// Generate mock projects
export const mockProjects: Project[] = Array.from({ length: 20 }, (_, i) => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - 3);
  
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3);
  
  const dateCreated = randomDate(pastDate, now);
  const dueDate = randomDate(now, futureDate);
  
  return {
    id: `project-${i + 1}`,
    projectName: projectNames[i],
    dateCreated: formatDateForMock(dateCreated),
    dueDate: formatDateForMock(dueDate),
    budget: randomBudget(),
    applicants: randomApplicants(),
    skills: randomSkills(),
  };
});