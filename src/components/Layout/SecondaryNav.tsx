import React from 'react';
import type { TabOption } from '../../types';

const tabs: TabOption[] = ['Overview', 'Notifications', 'Analytics', 'Saved reports', 'Trade history', 'User reports'];

interface SecondaryNavProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
}

export const SecondaryNav: React.FC<SecondaryNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
