import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  BarChart3, 
  FileEdit, 
  Settings,
  User
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { title: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { title: 'Freelancers', path: '/freelancers', icon: <Users size={20} /> },
    { title: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { title: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { title: 'Post a Job', path: '/post-job', icon: <FileEdit size={20} /> },
    ...(user?.role === 'freelancer' ? [
      { title: 'Profile', path: '/profile', icon: <User size={20} /> },
    ] : []),
    { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out z-30 ${
          isOpen ? 'w-64' : 'w-0 md:w-16'
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4">
          <div className={`font-bold text-xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
            FreelanceHub
          </div>
          <button onClick={toggleSidebar} className="text-white p-1 rounded hover:bg-gray-700 transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <NavLink 
                  to={item.path}
                  onClick={closeSidebarIfMobile}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                    ${isOpen ? 'justify-start' : 'justify-center md:justify-center'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'} whitespace-nowrap`}>
                    {item.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;