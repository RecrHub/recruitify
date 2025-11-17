import api from './api';
import { JobsResponse } from '@/types/job';

export const jobsService = {
  /**
   * Fetch paginated list of jobs
   * @param page - Page number (0-indexed)
   * @param size - Number of items per page
   * @returns Promise with jobs response
   */
  getJobs: async (page: number = 0, size: number = 10): Promise<JobsResponse> => {
    const response = await api.get(`/api/v1/jobs`, {
      params: { page, size }
    });
    return response.data;
  }
};

export default jobsService;

