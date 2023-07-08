import { API_BASE_URL } from '@/lib/constants/constants';

const fetchCheckDuplicateEmail = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/register/${email}/check`);

  if (response.status === 409) {
    return false;
  }
  if (!response.ok) {
    throw new Error('알 수 없는 에러가 발생하였습니다.');
  }
  return true;
};

export default fetchCheckDuplicateEmail;
