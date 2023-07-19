import { create } from 'zustand';
import { SignUpRequest, User } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants/constants';

type State = {};

type Actions = {
  fetchCheckDuplicateEmail: (email: string) => Promise<void>;
  fetchSignUp: ({
    nickname,
    email,
    password,
    gender,
    schoolName,
  }: SignUpRequest) => Promise<User>;
};

const useSignupStore = create<State & Actions>()(() => ({
  fetchCheckDuplicateEmail: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/register/${email}/check`);

    if (response.status === 409) {
      throw new Error('이미 사용중인 이메일입니다.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || '알 수 없는 에러가 발생하였습니다.');
    }
  },
  fetchSignUp: async ({
    nickname,
    email,
    password,
    gender,
    schoolName,
  }): Promise<User> => {
    console.log(
      JSON.stringify({ nickname, email, password, gender, schoolName }),
    );
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, email, password, gender, schoolName }),
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
