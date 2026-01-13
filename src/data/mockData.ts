import type { Customer, Region, Status } from '../types';

const companyNames = [
  'Acme Corporation', 'TechVision Labs', 'CloudScale Inc', 'DataFlow Systems',
  'InnovateCo', 'NextGen Solutions', 'Digital Dynamics', 'SmartWave Tech',
  'FutureForge', 'Quantum Analytics', 'Velocity Systems', 'Horizon Software',
  'Catalyst Labs', 'Pinnacle Tech', 'Synergy Cloud', 'ProActive Solutions',
  'Elevate Systems', 'StreamLine Inc', 'Alpha Innovations', 'Omega Tech',
  'Nexus Digital', 'Vertex Solutions', 'Prism Analytics', 'Eclipse Software',
  'Zenith Corp', 'Luminary Systems', 'Stellar Tech', 'Apex Innovations',
  'Beacon Software', 'Crest Solutions', 'Delta Digital', 'Echo Technologies',
  'Frontier Labs', 'Genesis Systems', 'Harbor Tech', 'Infinity Solutions',
  'Junction Digital', 'Keystone Software', 'Landmark Tech', 'Meridian Labs',
  'Nautilus Systems', 'Orbit Solutions', 'Pathway Digital', 'Quantum Labs',
  'Radius Tech', 'Summit Software', 'Titan Systems', 'Unity Solutions',
  'Vanguard Digital', 'Wavelength Tech', 'Xenon Labs', 'Yield Systems'
];

const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa', 'Tom', 'Anna'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const statuses: Status[] = ['Active', 'Active', 'Active', 'Active', 'Churned', 'Inactive'];
const regions: Region[] = ['North America', 'Europe', 'Asia'];

function generateAvatar(name: string): string {
  const initials = name.split(' ').map(n => n[0]).join('');
  return `https://ui-avatars.com/api/?name=${initials}&background=random`;
}

function generateUsers(count: number): { id: string; name: string; avatar: string }[] {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    users.push({
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name,
      avatar: generateAvatar(name)
    });
  }
  return users;
}

function getRandomDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
}

export const mockCustomers: Customer[] = companyNames.map((name, index) => {
  const userCount = Math.floor(Math.random() * 8) + 1;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: `customer-${index + 1}`,
    companyName: name,
    companyIcon: `https://ui-avatars.com/api/?name=${name.split(' ')[0]}&background=random&bold=true`,
    licenseUsage: Math.floor(Math.random() * 100),
    status,
    users: generateUsers(userCount),
    region: regions[Math.floor(Math.random() * regions.length)],
    joinDate: getRandomDate(365)
  };
});

export function getKPIData(timeRange: string, region: Region): { totalCustomers: number; members: number; activeNow: number } {
  let customers = mockCustomers;
  
  // Filter by region
  if (region !== 'All') {
    customers = customers.filter(c => c.region === region);
  }
  
  // Filter by time range
  const now = new Date();
  let daysAgo = 7;
  if (timeRange === 'Last 30 days') daysAgo = 30;
  if (timeRange === 'Last 90 days') daysAgo = 90;
  
  const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  customers = customers.filter(c => c.joinDate >= cutoffDate);
  
  const totalCustomers = customers.length;
  const members = customers.reduce((sum, c) => sum + c.users.length, 0);
  const activeNow = customers.filter(c => c.status === 'Active').length;
  
  return { totalCustomers, members, activeNow };
}
