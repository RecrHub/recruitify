export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description?: string;
  category?: string;
  postedDate?: Date | string;
}

