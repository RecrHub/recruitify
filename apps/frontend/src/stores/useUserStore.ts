// stores/userStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@shared/auth'  

interface UserState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  tokenType: string | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string, refreshToken: string, tokenType?: string) => void
  updateTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenType: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken, tokenType = 'Bearer') =>
        set(() => ({
          user,
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
          user: null,
          accessToken: null,
          refreshToken: null,
          tokenType: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
)