import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/lib/constants/constants';

import { ResultResponse } from '@/lib/types/response';

export default async function fetchResult(
  essayId: string,
): Promise<ResultResponse> {
  const res = await fetch(`${API_BASE_URL}/evaluate/${essayId}/result`, {
    method: 'GET',
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    redirect('/');
  }

  const data = await res.json();

  return data;
}
