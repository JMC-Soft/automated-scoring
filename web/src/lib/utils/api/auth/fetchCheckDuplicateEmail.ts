import { API_BASE_URL } from '@/lib/constants/constants';

export default async function fetchCheckDuplicateEmail(
  email: string,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/register/${email}/check`);

  if (response.status === 409) {
    throw new Error('이미 사용중인 이메일입니다.');
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || '알 수 없는 에러가 발생하였습니다.');
  }
}
