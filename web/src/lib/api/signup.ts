import { API_BASE_URL } from '@/lib/api/const';

export interface SignUpRequest {
  nickname: string;
  email: string;
  password: string;
}

type SignUpResult = 'success' | 'fail';

const signup = async (args: SignUpRequest): Promise<SignUpResult> => {
  const signUpRes = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(args),
  });

  console.log(signUpRes);

  return signUpRes.ok ? 'success' : 'fail';
};

export default signup;
