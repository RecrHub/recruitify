import { create } from 'zustand';
import { Job, JobsResponse } from '@/types/job';
import jobsService from '@/services/jobsService';

interface JobsState {
  jobs: Job[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;

  // Actions
  fetchJobs: (page?: number, size?: number) => Promise<void>;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 10,

  fetchJobs: async (page = 0, size = 10) => {
    const response: JobsResponse = await jobsService.getJobs(page, size);

    set({
      jobs: response.content,
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      currentPage: response.currentPage,
      pageSize: response.pageSize,
    });
  },
}));

export default useJobsStore;

