import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AdminInfo {
  id: number | string;
  email: string;
  role: string;
}

interface AdminState {
  adminInfo: AdminInfo | null
  accessToken: string | null
  refreshToken: string | null
  tokenType: string | null
  isAuthenticated: boolean
  setAdminAuth: (adminInfo: AdminInfo, accessToken: string, refreshToken: string, tokenType?: string) => void
  updateTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      adminInfo: null,
      accessToken: null,
      refreshToken: null,
      tokenType: null,
      isAuthenticated: false,

      setAdminAuth: (adminInfo, accessToken, refreshToken, tokenType = 'Bearer') =>
        set(() => ({
          adminInfo,
          accessToken,
          refreshToken,
          tokenType,
          isAuthenticated: true,
        })),

      updateTokens: (accessToken, refreshToken) =>
        set((state) => ({
          ...state,
          accessToken,
          refreshToken,
        })),

      logout: () =>
        set(() => ({
          adminInfo: null,
          accessToken: null,
          refreshToken: null,
          tokenType: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'admin-storage',
    }
  )
)