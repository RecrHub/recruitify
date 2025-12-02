import { create } from "zustand";
import { jobService } from "../services/jobService";
import { Job } from "../types/job";

interface JobDetailState {
  currentJob: Job | null;
  isLoading: boolean;
  error: string | null;

  fetchJobDetail: (jobId: string) => Promise<void>;
  clearJobDetail: () => void;
}

export const useJobDetailStore = create<JobDetailState>((set) => ({
  currentJob: null,
  isLoading: false,
  error: null,

  fetchJobDetail: async (jobId: string) => {
    try {
      set({ isLoading: true, error: null });

      const job = await jobService.getJobById(jobId);

      set({
        currentJob: job,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message || "Failed to load job detail",
      });
    }
  },

  clearJobDetail: () => {
    set({
      currentJob: null,
      isLoading: false,
      error: null,
    });
  },
}));