import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginRequest, User } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants/constants';

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  login: ({ email, password }: LoginRequest) => Promise<User>;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>()(
  devtools((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
    login: async ({ email, password }) => {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
        }

        if (response.status === 404) {
          throw new Error('존재하지 않는 이메일입니다.');
        }

        throw new Error('로그인에 실패했습니다.\n다시 시도해 주세요.');
      }

      const user = await response.json();

      return user;
    },
    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/logout`);

      if (!response.ok) {
        throw new Error('로그아웃에 실패했습니다.\n다시 시도해 주세요.');
      }

      set({ user: null, isLoggedIn: false });
    },
  })),
);

export type AuthStore = AuthState & AuthActions;

export default useAuthStore;
