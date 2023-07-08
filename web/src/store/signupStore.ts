import { create } from 'zustand';
import { ChangeEvent } from 'react';
import { SignUpRequest, User } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants/constants';

type State = {
  email: string;
  password: string;
  nickname: string;
  isUnique: boolean;
  lastCheckedEmail: string;
  status: 'idle' | 'pending' | 'success' | 'error';
};

type Actions = {
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: ChangeEvent<HTMLInputElement>) => void;
  fetchCheckDuplicateEmail: (email: string) => Promise<void>;
  setLastCheckedEmail: (lastCheckedUsername: string) => void;
  fetchSignUp: ({ nickname, email, password }: SignUpRequest) => Promise<User>;
};

const useSignupStore = create<State & Actions>()((set) => ({
  email: '',
  password: '',
  nickname: '',
  isUnique: false,
  lastCheckedEmail: '',
  status: 'idle',
  onChangeEmail: (e) => set({ email: e.target.value }),
  onChangePassword: (e) => set({ password: e.target.value }),
  onChangeNickname: (e) => set({ nickname: e.target.value }),
  setLastCheckedEmail: (lastCheckedEmail: string) => set({ lastCheckedEmail }),
  fetchCheckDuplicateEmail: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/register/${email}/check`);

    if (response.status === 409) {
      set({ isUnique: false });
      throw new Error('이미 사용중인 이메일입니다.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || '알 수 없는 에러가 발생하였습니다.');
    }

    set({ isUnique: true });
  },
  fetchSignUp: async ({ nickname, email, password }): Promise<User> => {
    set({ status: 'pending' });
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || '회원가입에 실패했습니다.');
    }

    const user = await response.json();
    return user;
  },
}));

export default useSignupStore;
