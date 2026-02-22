// Auth response types
export interface User {
  id: number;
  fullName?: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  id: number;
  email: string;
  role: string;
}
export interface RegisterRequest {
  fullName?: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface MessageResponse {
  message: string;
  success: boolean;
}

// Error type
export interface ApiError {
  message: string;
  status?: number;
  timestamp?: string;
  path?: string;
  details?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface Profile {
  accountId: number;
  fullName?: string;
  avatarUrl?: string;
  title?: string;
  about?: string;
  phoneNumber?: number;
  gender?: boolean;
  address?: string;
  dob?: string;
  personalLink?: string;
  provinceCode?: string;
}
