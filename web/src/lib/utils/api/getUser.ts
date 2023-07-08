import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/lib/constants/constants';
import { User } from '@/lib/types';

export default async function getUser(): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/verify/idToken`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const user = response.ok ? await response.json() : null;

  return user;
}
