import { useState, useMemo } from 'react';
import { TopNav } from './components/Layout/TopNav';
import { SecondaryNav } from './components/Layout/SecondaryNav';
import { WelcomeHeader } from './components/Dashboard/WelcomeHeader';
import { KPICards } from './components/Dashboard/KPICards';
import { FiltersSection } from './components/Dashboard/FiltersSection';
import { DataTable } from './components/Dashboard/DataTable';
import { PaginationControls } from './components/Dashboard/PaginationControls';
import { Modal } from './components/Common/Modal';
import { mockCustomers, getKPIData } from './data/mockData';
import type { TabOption, Filters, KPI } from './types';

const ROWS_PER_PAGE = 10;

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState<TabOption>('Overview');
  const [filters, setFilters] = useState<Filters>({
    timeRange: 'Last 7 days',
    region: 'All',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Filter customers based on filters
  const filteredCustomers = useMemo(() => {
    let filtered = [...mockCustomers];

    // Filter by region
    if (filters.region !== 'All') {
      filtered = filtered.filter(c => c.region === filters.region);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c =>
        c.companyName.toLowerCase().includes(searchLower) ||
        c.status.toLowerCase().includes(searchLower)
      );
    }

    // Filter by time range
    const now = new Date();
    let daysAgo = 7;
    if (filters.timeRange === 'Last 30 days') daysAgo = 30;
    if (filters.timeRange === 'Last 90 days') daysAgo = 90;
    
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(c => c.joinDate >= cutoffDate);

    return filtered;
  }, [filters]);

  // Calculate KPIs based on filters
  const kpis: KPI[] = useMemo(() => {
    const data = getKPIData(filters.timeRange, filters.region);
    
    return [
      {
        label: 'Total customers',
        value: data.totalCustomers,
        trend: 12.5,
        trendDirection: 'up'
      },
      {
        label: 'Members',
        value: data.members,
        trend: 8.3,
        trendDirection: 'up'
      },
      {
        label: 'Active now',
        value: data.activeNow,
        trend: 3.2,
        trendDirection: 'down'
      }
    ];
  }, [filters]);

  // Paginate customers
  const totalPages = Math.ceil(filteredCustomers.length / ROWS_PER_PAGE);
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return filteredCustomers.slice(start, end);
  }, [filteredCustomers, currentPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleRowSelect = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedCustomers.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedCustomers.map(c => c.id)));
    }
  };

  const allSelected = paginatedCustomers.length > 0 && selectedRows.size === paginatedCustomers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav activeSection={activeSection} onSectionChange={setActiveSection} />
      <SecondaryNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'Overview' ? (
          <>
            <WelcomeHeader
              onAddClick={() => setIsAddModalOpen(true)}
              onImportClick={() => setIsImportModalOpen(true)}
            />
            
            <KPICards kpis={kpis} />
            
            <FiltersSection filters={filters} onFiltersChange={setFilters} />
            
            <DataTable
              customers={paginatedCustomers}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
            />
            
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{activeTab}</h2>
            <p className="text-gray-600">This tab content is not yet implemented.</p>
          </div>
        )}
      </main>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer"
      >
        <div className="space-y-4">
          <p className="text-sm">Form to add a new customer would go here.</p>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Add Customer
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Customers"
      >
        <div className="space-y-4">
          <p className="text-sm">Upload a CSV file to import customers in bulk.</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">Drop your CSV file here or click to browse</p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Import
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
