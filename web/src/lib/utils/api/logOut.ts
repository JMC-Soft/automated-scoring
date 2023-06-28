import { API_BASE_URL } from '@/lib/utils/constants';

const logOut = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/logout`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || '로그아웃에 실패했습니다.');
  }

  return response.json();
};

export default logOut;