export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  location: string;
  category: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
