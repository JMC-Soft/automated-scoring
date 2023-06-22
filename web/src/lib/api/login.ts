import { API_BASE_URL } from '@/lib/api/const';

export interface LoginRequest {
  email: string;
  password: string;
}

type LoginResult = 'success' | 'fail';

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  // TODO 3-1: POST, '/auth/login' 호출
  // body에는 { username, password }가 들어가야 함
  // 사용하는 기술에 맞추어 적절히 withCredential 설정하기
  const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(args),
  });

  console.log(loginRes);

  return loginRes.ok ? 'success' : 'fail';
};
