import { create } from "zustand";
import { jobService } from "../services/jobService";
import { Job } from "../types/job"; 

interface JobsState {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  fetchJobs: (page: number) => Promise<void>;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,

  fetchJobs: async (page: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await jobService.getJobs(page);

      set({
        jobs: response.jobs,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch jobs",
        isLoading: false,
      });
    }
  },
}));
