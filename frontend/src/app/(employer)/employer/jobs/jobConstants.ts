import type { JobStatus } from './types';

export const statusTabs = ['All', 'Open', 'Hold', 'Closed', 'Drafts (2)'];

export const categoryFilterOptions = [
  { id: 1, label: 'Marketing Department' },
  { id: 2, label: 'Engineering Team' },
  { id: 3, label: 'Product Division' },
  { id: 4, label: 'Operations Group' },
  { id: 5, label: 'Sales Department' },
];

export const locationFilterOptions = [
  { code: 'CA-ON', label: 'Toronto, Ontario, Canada' },
  { code: 'US-NY', label: 'New York City, USA' },
  { code: 'UK-LDN', label: 'Lead Position, UK' },
];

export const jobTypeFilterOptions = [
  { id: 1, label: 'Full-Time Role' },
  { id: 2, label: 'Part-Time Role' },
  { id: 3, label: 'Contractor Position' },
];

export const statusLabel: Record<JobStatus, string> = {
  open: 'Open',
  hold: 'Hold',
  closed: 'Closed',
  draft: 'Draft',
};
