import api, { type LoginResponse } from "./api"; 

const adminAuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post("/api/v1/hr/auth/login", { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    const response = await api.post("/api/v1/auth/logout");
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post("/api/v1/auth/refresh", { refreshToken });
    return response.data;
  }
};

export default adminAuthService;