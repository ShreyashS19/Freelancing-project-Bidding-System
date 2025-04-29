import React from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden md:flex md:items-center md:w-72">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X size={24} /> : <Search size={24} />}
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 relative">
            <Bell size={22} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
              JD
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
          </div>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="px-4 pb-4 md:hidden">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
      
      {isMobileMenuOpen && (
        <nav className="px-4 pb-4 md:hidden bg-white shadow-lg absolute w-full z-10">
          <ul className="space-y-1">
            <li>
              <a href="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="mr-3"><LayoutDashboard size={20} /></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/freelancers" className="flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg transition-colors">
                <span className="mr-3"><Users size={20} /></span>
                <span>Freelancers</span>
              </a>
            </li>
            <li>
              <a href="/projects" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="mr-3"><FileText size={20} /></span>
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a href="/schedule" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="mr-3"><Calendar size={20} /></span>
                <span>Schedule</span>
              </a>
            </li>
            <li>
              <a href="/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="mr-3"><Settings size={20} /></span>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;