import { API_BASE_URL } from '@/lib/constants/constants';
import { SignInRequest } from '@/lib/types/request';
import { SignInResponse } from '@/lib/types/response';

export default async function fetchSignIn({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> {
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
}
