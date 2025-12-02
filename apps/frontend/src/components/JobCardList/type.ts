// types/jobCard.types.ts

/**
 * Job Interface - Main job data structure
 */
export interface Job {
  id: number;
  company: string;
  position: string;
  logo?: string;
  salary: string;
  location: string;
  timezone: string;
  hours: string;
  posted: string;
  skills: string[];
  description?: string;
  requirements?: string[];
  benefits?: string[];
  type?: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance';
  experienceLevel?: 'Entry Level' | 'Intermediate' | 'Expert';
  remote?: boolean;
  applicationDeadline?: string;
}

/**
 * JobCardList Props - Main component props
 */
export interface JobCardListProps {
  /** Array of jobs to display */
  jobs?: Job[];
  /** Callback when job card is clicked */
  onJobClick?: (job: Job) => void;
  /** Callback when apply button is clicked */
  onApply?: (job: Job) => void;
  /** Callback when bookmark is toggled */
  onToggleFavorite?: (jobId: number) => void;
  /** Set of favorite job IDs */
  favorites?: Set<number>;
  /** Loading state */
  loading?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Show pagination */
  showPagination?: boolean;
  /** Current page number */
  currentPage?: number;
  /** Total number of jobs */
  total?: number;
  /** Items per page */
  pageSize?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
}

/**
 * JobCard Props - Individual card props
 */
export interface JobCardProps {
  /** Job data */
  job: Job;
  /** Is job bookmarked */
  isFavorite: boolean;
  /** Callback when bookmark is toggled */
  onToggleFavorite: (jobId: number) => void;
  /** Callback when apply button is clicked */
  onApply: (job: Job) => void;
  /** Callback when card is clicked */
  onClick?: (job: Job) => void;
}

/**
 * API Response Types
 */
export interface JobsAPIResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface JobsAPIRequest {
  page?: number;
  limit?: number;
  category?: string;
  location?: string;
  type?: string[];
  experienceLevel?: string[];
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  searchKeyword?: string;
}

/**
 * Filter Options
 */
export const JOB_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Freelance'] as const;
export const EXPERIENCE_LEVELS = ['Entry Level', 'Intermediate', 'Expert'] as const;

export type JobType = typeof JOB_TYPES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];