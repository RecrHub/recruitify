import api from "./api";
import { Job } from "../types/job";
import { JobSearchFilters } from "../stores/useJobsStore";

export interface PaginatedJobsResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const jobService = {
  async getJobs(
    page: number = 1,
    filters: JobSearchFilters = {}
  ): Promise<PaginatedJobsResponse> {
    const params = new URLSearchParams();

    // page
    params.append("page", String(page));

    // filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        params.append(key, String(value));
      }
    });

    const res = await api.get(`/api/v1/jobs?${params.toString()}`);
    return res.data;
  },

  async getJobById(id: string | number): Promise<Job> {
    const res = await api.get(`/api/v1/jobs/${id}`);
    return res.data;
  },
};