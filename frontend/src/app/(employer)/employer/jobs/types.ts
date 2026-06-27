export type JobStatus = 'active' | 'draft' | 'completed';

export interface JobPosting {
  id: number;
  title: string;
  status: JobStatus;
  assignedToMe?: boolean;
  category: string;
  employmentType: string;
  workApproach: string;
  location: string;
  salary: string;
  experience: string;
  license: 'Yes' | 'No' | 'Required';
  applicants: number;
  openings: number;
  addedAt: string;
}
