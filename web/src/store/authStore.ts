import create from 'zustand';
import { checkDuplicateEmail, signUp } from '@/lib/utils/api/signUp';
import { handleFetchError } from '@/lib/utils/utils';
import login from '@/lib/utils/api/login';
import logOut from '@/lib/utils/api/logOut';

export interface User {
  email: string;
  nickname: string;
}

export interface SignUpInput {
  nickname: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

type State = {
  user: User | null;
  error: string | null;
  isLoggedIn: boolean;
  logIn: ({ email, password }: LoginInput) => Promise<void>;
  signUp: ({ nickname, email, password }: SignUpInput) => Promise<void>;
  checkDuplicateEmail: (email: string) => Promise<boolean>;
  logOut: () => void;
};

const useAuthStore = create<State>((set) => ({
  user: null,
  error: null,
  isLoggedIn: false,
  logIn: async ({ email, password }) => {
    try {
      const user = await login({ email, password });
      set({ user, isLoggedIn: true });
    } catch (error) {
      handleFetchError(error, set);
    }
  },
  signUp: async ({ nickname, email, password }) => {
    try {
      const user = await signUp({ nickname, email, password });
      set({ user, isLoggedIn: true });
    } catch (error) {
      handleFetchError(error, set);
    }
  },
  checkDuplicateEmail: async (email: string) => {
    try {
      return await checkDuplicateEmail(email);
    } catch (error) {
      handleFetchError(error, set);
      return false;
    }
  },
  logOut: async () => {
    try {
      await logOut();
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      handleFetchError(error, set);
    }
  },
}));

export default useAuthStore;
