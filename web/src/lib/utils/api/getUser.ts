import { cookies } from 'next/headers';
import { User } from '@/lib/types';

export default async function getUser(): Promise<User | null> {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/verify/idToken`, {
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
