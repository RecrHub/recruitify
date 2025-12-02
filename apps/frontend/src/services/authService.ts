import axios from "axios";
import type {
  JwtResponse,
  RegisterRequest,
  MessageResponse,
  RefreshTokenRequest,
  User,
  LoginRequest,
} from "@shared/auth";
import { useUserStore } from "@/stores/useUserStore";

// Get the base URL from environment or use default
const getApiBaseUrl = () => {
  const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  return envBaseUrl || "http://13.212.149.244:8080";
};

// Create a separate instance to avoid circular dependency with api.ts
const authAxios = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

const authService = {
  /**
   * Login a user with username and password
   */
  login: async (email: string, password: string): Promise<JwtResponse> => {
    try {
      const loginRequest: LoginRequest = { email, password };
      const response = await authAxios.post<JwtResponse>(
        "/api/v1/auth/login",
        loginRequest
      );
      const { id, email: userEmail, role, accessToken, refreshToken, tokenType } = response.data;

      const user = {
        id,
        email: userEmail,
        role,
      };

      useUserStore.getState().setAuth(user, accessToken, refreshToken, tokenType);
      return response.data;
    } catch (error: any) {
      // Extract error message from response for display
      if (error.response?.data) {
        const errorData = error.response.data;
        // Check if there are detailed error information
        if (errorData.details) {
          throw new Error(errorData.details);
        } else if (errorData.message) {
          throw new Error(errorData.message);
        } else {
          throw new Error("Login failed");
        }
      }
      throw error;
    }
  },

  /**
   * Register a new user
   */
  register: async (registerData: RegisterRequest): Promise<MessageResponse> => {
    const response = await authAxios.post<MessageResponse>(
      "/api/v1/auth/register",
      registerData
    );
    return response.data;
  },

  /**
   * Logout the current user
   */
  //   logout: async (username: string): Promise<void> => {
  //     try {
  //       const logoutRequest: LogoutRequest = { username };
  //       await authAxios.post('/api/auth/logout', logoutRequest);
  //     } finally {
  //       // Always clear local storage on logout
  //       localStorage.removeItem('user');
  //     }
  //   },

  /**
   * Refresh the access token using a refresh token
   * This is called by the API interceptor when a 401 error occurs
   */
  refreshToken: async (refreshToken: string): Promise<JwtResponse> => {
    try {
      const request: RefreshTokenRequest = { refreshToken };
      const response = await authAxios.post<JwtResponse>(
        "/api/auth/refresh",
        request
      );
      const { id, email, role, accessToken, refreshToken: newRefreshToken, tokenType } = response.data;

      const user = {
        id,
        email,
        role,
      };

      useUserStore.getState().setAuth(user, accessToken, newRefreshToken, tokenType);
      return response.data;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Let the caller handle the error
      throw error;
    }
  },

  /**
   * Check if a JWT token is expired
   */
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Check token expiration with 30 seconds buffer
      return payload.exp * 1000 < Date.now() - 30000;
    } catch (e) {
      console.error("Error parsing token:", e);
      return true; // If we can't parse the token, assume it's expired
    }
  },
};

export default authService;
