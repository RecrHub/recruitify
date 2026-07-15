import api from "./api";
import { Job } from "../types/job";

export interface ApiResponse<T> {
  timestamp: string;
  status: number;
  message: string;
  data: T;
  errors?: Record<string, unknown>;
}

export interface PaginatedJobsResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  responsibilities: string;
  requirement: string;
  benefit: string;
  minSalary: number;
  maxSalary: number;
  isHidden: boolean;
  companyId: number;
  categoryId: number;
  employmentTypeId: number;
  experienceLevelId: number;
  workApproachId: number;
  wardCode: string;
  skillsName: string[];
}

export const jobService = {
  async getJobs(page: number = 1): Promise<PaginatedJobsResponse> {
    const res = await api.get<ApiResponse<PaginatedJobsResponse>>(
      `/api/v1/jobs?page=${page}`
    );
    return res.data.data;
  },

  async getJobById(id: string | number): Promise<Job> {
    const res = await api.get<ApiResponse<Job>>(`/api/v1/jobs/${id}`);
    return res.data.data;
  },

  async createJob(payload: CreateJobPayload): Promise<Job> {
    const res = await api.post<ApiResponse<Job>>("/api/v1/jobs", payload);
    return res.data.data;
  },
};