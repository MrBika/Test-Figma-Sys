export type Status = 'Active' | 'Churned' | 'Inactive';
export type Region = 'North America' | 'Europe' | 'Asia' | 'All';
export type TimeRange = 'Last 7 days' | 'Last 30 days' | 'Last 90 days' | 'Custom';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Customer {
  id: string;
  companyName: string;
  companyIcon: string;
  licenseUsage: number;
  status: Status;
  users: User[];
  region: Region;
  joinDate: Date;
}

export interface KPI {
  label: string;
  value: number;
  trend: number;
  trendDirection: 'up' | 'down';
}

export interface Filters {
  timeRange: TimeRange;
  region: Region;
  search: string;
}

export type TabOption = 'Overview' | 'Notifications' | 'Analytics' | 'Saved reports' | 'Trade history' | 'User reports';
