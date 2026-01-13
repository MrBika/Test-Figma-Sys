import React from 'react';
import type { KPI } from '../../types';

interface KPICardsProps {
  kpis: KPI[];
}

export const KPICards: React.FC<KPICardsProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{kpi.label}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">
              {kpi.value.toLocaleString()}
            </span>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              kpi.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.trendDirection === 'up' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span>{Math.abs(kpi.trend)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
