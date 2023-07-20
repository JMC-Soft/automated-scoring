import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@/lib/types';

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
};

type AuthActions = {
  setUser: (user: User | null) => void;
};

const useAuthStore = create<AuthState & AuthActions>()(
  devtools((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
  })),
);

export default useAuthStore;
