import { EvaluateResponse } from '@/lib/types/response';
import { EvaluateRequest } from '@/lib/types/request';
import { API_BASE_URL } from '@/lib/constants/api';

export default async function fetchEvaluateEssay({
  topic,
  type,
  essayText,
  id,
  email,
}: EvaluateRequest): Promise<EvaluateResponse> {
  const response = await fetch(`${API_BASE_URL}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      topic,
      type,
      id,
      essayText,
    }),
  });

  if (!response.ok) {
    throw new Error('에세이 평가에 실패했습니다.\n다시 시도해 주세요.');
  }

  const essayId = await response.json();

  return essayId;
}
