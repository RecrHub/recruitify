import type { LucideIcon } from 'lucide-react';

export type JobStatus = 'active' | 'draft' | 'completed';

export interface PipelineStat {
  key: string;
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: 'default' | 'hired' | 'rejected';
}

export interface JobPosting {
  id: number;
  title: string;
  status: JobStatus;
  assignedToMe?: boolean;
  employmentType: string;
  location: string;
  available: {
    current: number;
    total: number;
  } | null;
  addedAt: string;
  pipeline: PipelineStat[];
}
