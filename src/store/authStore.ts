import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'individual' | 'business' | 'expert';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  updateUser: (partial: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (partial) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...partial } } : {}
        ),
    }),
    {
      name: 'anchor_auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
