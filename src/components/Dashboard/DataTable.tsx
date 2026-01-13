import React from 'react';
import type { Customer } from '../../types';
import { Badge } from '../Common/Badge';
import { ActionMenu } from '../Common/ActionMenu';

interface DataTableProps {
  customers: Customer[];
  selectedRows: Set<string>;
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  allSelected: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  customers,
  selectedRows,
  onRowSelect,
  onSelectAll,
  allSelected
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
      {selectedRows.size > 0 && (
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
          <span className="text-sm font-medium text-blue-900">
            {selectedRows.size} row{selectedRows.size > 1 ? 's' : ''} selected
          </span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                License Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedRows.has(customer.id) ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(customer.id)}
                    onChange={() => onRowSelect(customer.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img
                      src={customer.companyIcon}
                      alt={customer.companyName}
                      className="w-10 h-10 rounded-lg"
                    />
                    <span className="text-sm font-medium text-gray-900">{customer.companyName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-48">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">{customer.licenseUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${customer.licenseUsage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status={customer.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {customer.users.slice(0, 3).map((user) => (
                        <img
                          key={user.id}
                          src={user.avatar}
                          alt={user.name}
                          title={user.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    {customer.users.length > 3 && (
                      <span className="ml-2 text-xs text-gray-500 font-medium">
                        +{customer.users.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionMenu
                    onEdit={() => console.log('Edit', customer.companyName)}
                    onView={() => console.log('View', customer.companyName)}
                    onExport={() => console.log('Export', customer.companyName)}
                    onDelete={() => console.log('Delete', customer.companyName)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
