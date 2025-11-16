// src/services/jobService.ts
import apiClient from './api';
import { PaginatedResponse, JobListing } from '../types';

export const getJobs = async (page: number, size: number): Promise<PaginatedResponse<JobListing>> => {
  const response = await apiClient.get<PaginatedResponse<JobListing>>('/jobs', {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

