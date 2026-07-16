import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import adminAuthService from './adminAuthService';
import { ApiError } from '@/types/auth'; 
import { useAdminStore } from '@/stores/admin/useAdminStore'; 

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  id?: number | string;
  role?: string;
  admin?: {
    id: number | string;
    email: string;
    role: string;
  };
  user?: {
    id: number | string;
    email: string;
    role: string;
  };
}

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const getApiBaseUrl = () => {
  const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  return envBaseUrl || "http://localhost:8080";
};

const BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = [];

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

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const adminStorage = localStorage.getItem('admin-storage');
    if (adminStorage) {
      try {
        const parsed = JSON.parse(adminStorage);
        const accessToken = parsed?.state?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing admin storage: - api.ts:67', error);
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(new Error(formatApiError(error).message))
);


api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    const isLoginRequest = originalRequest?.url?.includes('/api/v1/admin/auth/login') || originalRequest?.url?.includes('/api/v1/hr/auth/login');
    
    if (!originalRequest || 
        isLoginRequest || 
        (error.response?.status !== 401 && error.response?.status !== 403) || 
        (originalRequest as RetryableAxiosRequestConfig)._retry) {
      return Promise.reject(new Error(formatApiError(error).message));
    }

    (originalRequest as RetryableAxiosRequestConfig)._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        })
        .catch(err => Promise.reject(new Error(formatApiError(err).message)));
    }

    isRefreshing = true;

    try {
      const refreshToken = useAdminStore.getState().refreshToken;
      if (!refreshToken) throw new Error('No refresh token available');

      // Gọi API refresh token
      const response = await adminAuthService.refreshToken(refreshToken);
      
      useAdminStore.getState().setAdminAuth(
        useAdminStore.getState().adminInfo || { id: 0, email: '', role: 'CUSTOMER_ADMIN' },
        response.accessToken,
        response.refreshToken || '',
        response.tokenType || 'Bearer'
      );
      
      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
      processQueue(null, response.accessToken);
      return axios(originalRequest);
      
    } catch (refreshError) {
      processQueue(refreshError as Error, null);
      useAdminStore.getState().logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/employer/login?session=expired'; 
      }
      return Promise.reject(new Error(formatApiError(refreshError).message));
    } finally {
      isRefreshing = false;
    }
  }
);

function formatApiError(error: unknown): ApiError {
  const apiError: ApiError = { message: 'An unknown error occurred', status: 500 };
  if (axios.isAxiosError(error)) {
    apiError.status = error.response?.status ?? 500;
    if (error.response?.data) {
      const errorData = error.response?.data as any;
      apiError.message = errorData.message ?? errorData.error ?? error.message;
      apiError.timestamp = errorData.timestamp;
      apiError.path = errorData.path;
      apiError.details = errorData.details;
    } else {
      apiError.message = error.message;
    }
  } else if (error instanceof Error) {
    apiError.message = error.message;
  }
  return apiError;
}

export default api;