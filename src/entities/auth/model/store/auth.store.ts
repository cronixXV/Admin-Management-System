import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthState {
  token: string | null;
  remember: boolean;

  setRemember: (value: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

const getInitialToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      token: getInitialToken(),
      remember: true,

      setRemember: (remember) => set({ remember }),

      login: (token) => {
        const { remember } = get();

        if (remember) {
          localStorage.setItem('token', token);
          sessionStorage.removeItem('token');
        } else {
          sessionStorage.setItem('token', token);
          localStorage.removeItem('token');
        }

        set({ token });
      },

      logout: () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        set({ token: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        remember: state.remember
      })
    }
  )
);
