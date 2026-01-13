import React from 'react';

const navItems = ['Home', 'Dashboard', 'Projects', 'Tasks', 'Reporting', 'Users'];

interface TopNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900">Admin</span>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onSectionChange(item)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
