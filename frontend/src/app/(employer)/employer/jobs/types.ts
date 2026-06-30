export type JobStatus = 'open' | 'hold' | 'closed' | 'draft';

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
