import { API_BASE_URL } from '@/lib/api/const';

export interface LoginRequest {
  email: string;
  password: string;
}

type LoginResult = 'success' | 'fail';

const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginRes = await fetch(`${API_BASE_URL}/login`, {
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

export default login;
