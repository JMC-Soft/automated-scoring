import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/lib/constants/constants';
import { Result } from '@/lib/types';

export default async function fetchResult(essayId: string): Promise<Result> {
  const res = await fetch(`${API_BASE_URL}/evaluate/${essayId}/result`, {
    method: 'GET',
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    throw new Error(
      '에세이 평가 결과를 불러오는데 실패했습니다.\n다시 시도해 주세요.',
    );
  }

  const data = await res.json();

  return data;
}
