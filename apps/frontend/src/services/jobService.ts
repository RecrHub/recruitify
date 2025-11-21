import api from "./api";
import { Job } from "../types/job";

export interface PaginatedJobsResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const jobService = {
  async getJobs(page: number = 1): Promise<PaginatedJobsResponse> {
    const res = await api.get(`/api/v1/jobs?page=${page}`);
    return res.data;
  },

  async getJobById(id: string | number): Promise<Job> {
    const res = await api.get(`/api/v1/jobs/${id}`);
    return res.data;
  },
};
