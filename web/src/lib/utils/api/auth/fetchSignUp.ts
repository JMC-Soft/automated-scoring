import { SignUpRequest } from '@/lib/types/request';
import { SignUpResponse } from '@/lib/types/response';
import { API_BASE_URL } from '@/lib/constants/api';

export default async function fetchSignUp({
  nickname,
  email,
  password,
  gender,
  schoolName,
}: SignUpRequest): Promise<SignUpResponse> {
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
}
