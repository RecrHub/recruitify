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
  category: string;
  status: JobStatus;
  salary: string;
  location: string;
  matched: number;
  availability: string;
  workApproach: string;
  license: string;
  experience: string;
  applicants: number;
  about: string;
  responsibilities: string[];
  education: string;
  skills: string[];
  qualifications: string[];
}
