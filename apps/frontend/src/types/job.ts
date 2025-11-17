// Job data types based on architecture documentation
export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  category?: string;
  salary?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobsResponse {
  content: Job[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

