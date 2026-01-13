import React from 'react';
import type { Filters, TimeRange, Region } from '../../types';

interface FiltersSectionProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const timeRanges: TimeRange[] = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom'];
const regions: Region[] = ['All', 'North America', 'Europe', 'Asia'];

export const FiltersSection: React.FC<FiltersSectionProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Time Range</label>
            <select
              value={filters.timeRange}
              onChange={(e) => onFiltersChange({ ...filters, timeRange: e.target.value as TimeRange })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
            <select
              value={filters.region}
              onChange={(e) => onFiltersChange({ ...filters, region: e.target.value as Region })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div className="pt-5">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              More filters
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by company, status..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
