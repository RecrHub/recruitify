export type JobStatus = 'open' | 'hold' | 'closed' | 'draft';

export interface JobPostPayload {
  title: string;
  description: string;
  requirement: string | null;
  responsibilities: string | null;
  benefit: string | null;
  minSalary: number;
  maxSalary: number;
  isHidden: boolean;
  isFeatured: boolean;
  categoryId: number;
  companyId: number;
  employmentTypeId: number;
  experienceLevelId: number;
  workApproachId: number;
  wardCode: string;
}

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  requirement: string;
  responsibilities: string;
  benefit: string;
  minSalary: number;
  maxSalary: number;
  isHidden: boolean;
  isFeatured: boolean;
  categoryId: number;
  companyId: number;
  employmentTypeId: number;
  experienceLevelId: number;
  workApproachId: number;
  wardCode: string;
}

export interface EmployerJobListItem extends JobPosting {
  status: JobStatus;
  matched: number;
  applicants: number;
  education: string;
  skills: string[];
  qualifications: string[];
}
