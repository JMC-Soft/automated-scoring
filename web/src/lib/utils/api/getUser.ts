import { API_BASE_URL } from '@/lib/utils/constants';

import { User } from '@/lib/typing';

export default async function getUser(): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/user`, {
    credentials: 'include',
  });

  return response.ok
    ? ((await response.json()) as User)
    : { nickname: 'test', email: 'text@test.te' };

  return response.json();
}
