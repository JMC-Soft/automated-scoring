import { API_BASE_URL } from '@/lib/constants/constants';

const fetchLogOut = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/logout`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || '로그아웃에 실패했습니다.');
  }
};

export default fetchLogOut;
