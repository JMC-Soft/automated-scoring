import { cookies } from 'next/headers';
import { HistoryResponse } from '@/lib/types/response';
import { API_BASE_URL } from '@/lib/constants/api';

export default async function fetchHistory(): Promise<HistoryResponse> {
  const res = await fetch(`${API_BASE_URL}/history`, {
    method: 'GET',

    credentials: 'include',
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error(
      '채점 이력을 불러오는데 실패했습니다.\n다시 시도해 주세요.',
    );
  }

  const data = await res.json();

  return data;
}
