import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/lib/constants/constants';
import { User } from '@/lib/types';

export default async function getUser(): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/verify/idToken`, {
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    return null;
  }

  const user = await response.json();

  return user;
}
