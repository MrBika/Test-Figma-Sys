# Admin Dashboard

A fully functional admin dashboard UI built with React, TypeScript, Vite, and Tailwind CSS.

## Features

### Navigation
- **Top Global Navigation**: Horizontal navigation bar with sections (Home, Dashboard, Projects, Tasks, Reporting, Users)
- **Secondary Tab Navigation**: Contextual tabs (Overview, Notifications, Analytics, Saved reports, Trade history, User reports)

### Dashboard Components
- **Welcome Header**: Greeting message with action buttons (Add, Import)
- **KPI Cards**: Three key metrics with trend indicators
  - Total customers
  - Members
  - Active now
- **Filters & Search**: Time range and region filters with search functionality
- **Data Table**: Comprehensive customer data table with:
  - Multi-select checkboxes
  - Company information with icons
  - License usage progress bars
  - Status badges (Active, Churned, Inactive)
  - User avatars
  - Row action menus (Edit, View, Export, Delete)
- **Pagination**: Navigate through data pages

### Interactions
- Tab switching between different views
- Real-time filtering of data based on time range, region, and search terms
- KPI updates based on active filters
- Multi-row selection with select all functionality
- Modal dialogs for Add and Import actions
- Dropdown action menus for each table row

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **@tailwindcss/postcss** - PostCSS plugin for Tailwind

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── TopNav.tsx           # Main navigation bar
│   │   └── SecondaryNav.tsx     # Tab navigation
│   ├── Dashboard/
│   │   ├── WelcomeHeader.tsx    # Welcome section with action buttons
│   │   ├── KPICards.tsx         # KPI metrics display
│   │   ├── FiltersSection.tsx   # Filters and search
│   │   ├── DataTable.tsx        # Main data table
│   │   └── PaginationControls.tsx # Pagination UI
│   └── Common/
│       ├── Modal.tsx            # Reusable modal component
│       ├── Badge.tsx            # Status badge component
│       └── ActionMenu.tsx       # Dropdown action menu
├── types/
│   └── index.ts                 # TypeScript type definitions
├── data/
│   └── mockData.ts              # Mock customer data (50+ records)
├── App.tsx                      # Main application component
└── index.css                    # Tailwind CSS imports
```

## Features Checklist

- ✅ Tab switching with content state management
- ✅ Filter updates affecting KPI cards and table
- ✅ Search filtering by company name and status
- ✅ Multi-select checkboxes (individual + select all)
- ✅ Pagination with page navigation
- ✅ Modal dialogs for Add/Import actions
- ✅ Row action menus (Edit, View, Export, Delete)
- ✅ Responsive typography and spacing
- ✅ Professional SaaS design aesthetic
- ✅ 50+ mock customer records with realistic data

## Design System

### Colors
- **Primary**: Blue (`blue-600`, `blue-700`)
- **Status**: 
  - Active: Green (`green-100`, `green-800`)
  - Churned: Red (`red-100`, `red-800`)
  - Inactive: Gray (`gray-100`, `gray-800`)
- **Neutral**: Gray scale for backgrounds and borders

### Spacing
- Card padding: `p-6` (24px)
- Component gaps: `gap-6` (24px)
- Border radius: `rounded-lg` (8px)

### Typography
- Headers: `text-2xl font-bold`
- Body: `text-sm` or `text-base`
- Labels: `text-xs font-medium`

## Mock Data

The application includes 50+ mock customer records with:
- Realistic company names
- Random license usage (0-100%)
- Status distribution (Active, Churned, Inactive)
- Multiple users per company with avatars
- Regional distribution (North America, Europe, Asia)
- Join dates for time-based filtering

## Development Notes

- All TypeScript type imports use `import type` syntax
- No custom CSS - everything styled with Tailwind utilities
- Client-side only - no API calls
- Desktop-focused (no mobile responsiveness)
- State management via React hooks
