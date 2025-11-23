import { create } from "zustand";
import { jobService } from "../services/jobService";
import { Job } from "../types/job";

export interface JobSearchFilters {
  keyword?: string;
  location?: string;
  category?: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
}

interface JobsState {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  filters: JobSearchFilters;

  fetchJobs: (page?: number) => Promise<void>;
  setFilters: (filters: JobSearchFilters) => void;
  clearFilters: () => void;
}

const defaultFilters: JobSearchFilters = {
  keyword: "",
  location: "",
  category: "",
  salaryMin: null,
  salaryMax: null,
};

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,

  filters: defaultFilters,

  // Fetch with page + filters
  fetchJobs: async (page = 1) => {
    set({ isLoading: true, error: null });

    try {
      const filters = get().filters;

      const response = await jobService.getJobs(page, filters);

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

  // Update filters
  setFilters: (filters) => {
    set({
      filters: {
        ...get().filters,
        ...filters,
      },
    });
  },

  // Reset all filters to default
  clearFilters: () => {
    set({ filters: defaultFilters });
  },
}));
