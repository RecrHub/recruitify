// src/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface HealthResponse {
  status: string;
  timestamp?: string;
  message?: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/health`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
}
