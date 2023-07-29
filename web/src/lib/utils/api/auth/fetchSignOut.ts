import { API_BASE_URL } from '@/lib/constants/api';

export default async function fetchSignOut(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/logout`);

  if (!response.ok) {
    throw new Error('로그아웃에 실패했습니다.\n다시 시도해 주세요.');
  }
}
