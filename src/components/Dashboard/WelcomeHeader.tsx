import React from 'react';

interface WelcomeHeaderProps {
  onAddClick: () => void;
  onImportClick: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ onAddClick, onImportClick }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-600">Track, manage and forecast your customers and orders.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onImportClick}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Import
          </button>
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
