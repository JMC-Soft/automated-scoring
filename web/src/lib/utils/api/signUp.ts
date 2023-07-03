import { API_BASE_URL } from '@/lib/constants/constants';

import { SignUpRequest, User } from '@/lib/types';

export const checkDuplicateEmail = async (email: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/register/${email}/check`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || '중복 검사에 실패했습니다.');
  }

  return response.ok;
};

export const signUp = async (args: SignUpRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || '회원가입에 실패했습니다.');
  }

  return response.json();
};
