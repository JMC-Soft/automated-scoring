import { redirect } from 'next/navigation';

import { ResultResponse } from '@/lib/types/response';
import { API_BASE_URL } from '@/lib/constants/api';

export default async function fetchResult(
  essayId: string,
): Promise<ResultResponse> {
  const res = await fetch(`${API_BASE_URL}/evaluate/${essayId}/result`, {
    method: 'GET',
    cache: 'force-cache',
  });

  if (!res.ok) {
    if (res.status === 401) {
      alert('로그인이 필요합니다.');
    }
    redirect('/signin');
  }
  const data = await res.json();

  return data;
}
