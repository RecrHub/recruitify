// src/services/api.ts
import axios from 'axios';
// import { useUserStore } from '@/stores/useUserStore';

export interface HealthResponse {
  status: string;
  timestamp?: string;
  message?: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
});

// Request interceptor to add the auth token
apiClient.interceptors.request.use((config) => {
  // TODO: Replace with useUserStore.getState().token when auth store is implemented
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

// Legacy health check function using fetch
export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1/health');
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
}
