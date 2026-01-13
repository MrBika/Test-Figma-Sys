import React from 'react';
import type { Status } from '../../types';

interface BadgeProps {
  status: Status;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const styles = {
    Active: 'bg-green-100 text-green-800',
    Churned: 'bg-red-100 text-red-800',
    Inactive: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};
