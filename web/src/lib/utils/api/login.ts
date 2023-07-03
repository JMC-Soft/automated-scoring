import { API_BASE_URL } from '@/lib/constants/constants';
import { LoginRequest, User } from '@/lib/types';

const login = async (args: LoginRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(args),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || '회원가입에 실패했습니다.');
  }

  return response.json();
};

export default login;
