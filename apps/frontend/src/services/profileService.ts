import api from './api';
import type {
  Profile,
  ProfileUpdateRequest,
  WorkExperience,
  WorkExperienceRequest,
  Education,
  EducationRequest,
  Province,
} from '@/types/profile';

const profileService = {
  // Profile
  getProfile: async (accountId: number): Promise<Profile> => {
    const response = await api.get<Profile>(`/api/v1/profiles/${accountId}`);
    return response.data;
  },

  getMyProfile: async (): Promise<Profile> => {
    const response = await api.get<Profile>('/api/v1/profiles/me');
    return response.data;
  },

  updateProfile: async (accountId: number, data: ProfileUpdateRequest): Promise<Profile> => {
    const response = await api.put<Profile>(`/api/v1/profiles/${accountId}`, data);
    return response.data;
  },

  uploadAvatar: async (accountId: number, file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ avatarUrl: string }>(
      `/api/v1/profiles/${accountId}/avatar`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  // Work Experience
  getWorkExperiences: async (accountId: number): Promise<WorkExperience[]> => {
    const response = await api.get<WorkExperience[]>(`/api/v1/profiles/${accountId}/work-experiences`);
    return response.data;
  },

  addWorkExperience: async (accountId: number, data: WorkExperienceRequest): Promise<WorkExperience> => {
    const response = await api.post<WorkExperience>(`/api/v1/profiles/${accountId}/work-experiences`, data);
    return response.data;
  },

  updateWorkExperience: async (accountId: number, id: number, data: WorkExperienceRequest): Promise<WorkExperience> => {
    const response = await api.put<WorkExperience>(`/api/v1/profiles/${accountId}/work-experiences/${id}`, data);
    return response.data;
  },

  deleteWorkExperience: async (accountId: number, id: number): Promise<void> => {
    await api.delete(`/api/v1/profiles/${accountId}/work-experiences/${id}`);
  },

  // Education
  getEducations: async (accountId: number): Promise<Education[]> => {
    const response = await api.get<Education[]>(`/api/v1/profiles/${accountId}/educations`);
    return response.data;
  },

  addEducation: async (accountId: number, data: EducationRequest): Promise<Education> => {
    const response = await api.post<Education>(`/api/v1/profiles/${accountId}/educations`, data);
    return response.data;
  },

  updateEducation: async (accountId: number, id: number, data: EducationRequest): Promise<Education> => {
    const response = await api.put<Education>(`/api/v1/profiles/${accountId}/educations/${id}`, data);
    return response.data;
  },

  deleteEducation: async (accountId: number, id: number): Promise<void> => {
    await api.delete(`/api/v1/profiles/${accountId}/educations/${id}`);
  },

  // Provinces
  getProvinces: async (): Promise<Province[]> => {
    const response = await api.get<Province[]>('/api/v1/provinces');
    return response.data;
  },
};

export default profileService;
