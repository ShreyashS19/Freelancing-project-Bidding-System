import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-end">
      {/* Notifications */}
      <div className="relative mr-4" ref={notificationsRef}>
        <button 
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors relative"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            3
          </span>
        </button>

        {notificationsOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200 animate-fade-in">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Project Update:</span> New message from Client
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-center border-t border-gray-200">
              <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                View all notifications
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative" ref={profileRef}>
        <button 
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={20} className="text-gray-600" />
            )}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200 animate-fade-in">
            <Link 
              to="/settings/profile" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setProfileOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Account Settings
            </Link>
            <button 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                setProfileOpen(false);
                onLogout();
              }}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;