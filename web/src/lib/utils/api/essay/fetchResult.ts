import { ResultResponse } from '@/lib/types/response';
import API_BASE_URL from '@/lib/constants/api';

export default async function fetchResult(
  essayId: string,
): Promise<ResultResponse> {
  const res = await fetch(`${API_BASE_URL}/evaluate/${essayId}/result`, {
    method: 'GET',
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('token is invalid');
    }

    throw new Error(
      '채점 이력을 불러오는데 실패했습니다.\n다시 시도해 주세요.',
    );
  }

  const data = await res.json();

  return data;
}
