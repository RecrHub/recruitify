import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import authService from './authService';
import { ApiError } from '@shared/auth';
import { useUserStore } from '@/stores/useUserStore';

// More robust way to get API base URL
const getApiBaseUrl = () => {
  const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  return envBaseUrl || 'http://localhost:8080';
};

const BASE_URL = getApiBaseUrl();


export interface HealthResponse {
  status: string;
  timestamp?: string;
  message?: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/health`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Store pending requests that should be retried after token refresh
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

// Process the failed queue - either resolve or reject all pending requests
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken) {
      try {
        const userData = JSON.parse(accessToken);
        if (userData?.accessToken) {
          config.headers.Authorization = `Bearer ${userData.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(new Error(formatApiError(error).message));
  }
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (!originalRequest || 
        (error.response?.status !== 401 && error.response?.status !== 403) || 
        (originalRequest as any)._retry) {
      return Promise.reject(new Error(formatApiError(error).message));
    }

    (originalRequest as any)._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        })
        .catch(err => {
          return Promise.reject(new Error(formatApiError(err).message));
        });
    }

    isRefreshing = true;

    try {
      // Lấy refreshToken từ Zustand store
      const refreshToken = useUserStore.getState().refreshToken;
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Gọi API refresh token
      const response = await authService.refreshToken(refreshToken);
      
      //Cập nhật tokens vào Zustand store
      useUserStore.getState().updateTokens(
        response.accessToken,
        response.refreshToken
      );
      
      // Update request với token mới
      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
      
      processQueue(null, response.accessToken);
      
      return axios(originalRequest);
      
    } catch (refreshError) {
      // Logout thông qua Zustand store
      processQueue(refreshError as Error, null);
      useUserStore.getState().logout();
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login?session=expired';
      }
      return Promise.reject(new Error(formatApiError(refreshError).message));
      
    } finally {
      isRefreshing = false;
    }
  }
);

// Format API errors consistently
function formatApiError(error: unknown): ApiError {
  const apiError: ApiError = {
    message: 'An unknown error occurred',
    status: 500
  };

  if (axios.isAxiosError(error)) {
    apiError.status = error.response?.status ?? 500;

    if (error.response?.data) {
      const errorData = error.response?.data as { message?: string; error?: string; timestamp?: string; path?: string; details?: string };
      apiError.message = errorData.message ?? errorData.error ?? error.message;
      apiError.timestamp = errorData.timestamp;
      apiError.path = errorData.path;
      apiError.details = errorData.details;
    } else {
      apiError.message = error.message;
    }

    // Add request metadata
    if (error.config?.url) {
      apiError.path = error.config.url;
    }
  } else if (error instanceof Error) {
    apiError.message = error.message;
  } else if (typeof error === 'string') {
    apiError.message = error;
  }

  return apiError;
}

export default api;