// Auth response types
export interface User {
  id: number;
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
  name?: string;
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
