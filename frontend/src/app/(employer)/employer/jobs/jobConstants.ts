import type { JobStatus } from './types';

export const statusTabs = ['All', 'Open', 'Hold', 'Closed', 'Drafts (2)'];

export const filterGroups = [
  {
    title: 'Category Selection',
    options: ['Marketing Department', 'Engineering Team', 'Product Division', 'Operations Group', 'Sales Department'],
  },
  {
    title: 'Location Details',
    options: ['Toronto, Ontario, Canada', 'New York City, USA', 'Lead Position, UK'],
  },
  {
    title: 'Job Type Options',
    options: ['Full-Time Role', 'Part-Time Role', 'Contractor Position'],
  },
];

export const statusLabel: Record<JobStatus, string> = {
  open: 'Open',
  hold: 'Hold',
  closed: 'Closed',
  draft: 'Draft',
};
