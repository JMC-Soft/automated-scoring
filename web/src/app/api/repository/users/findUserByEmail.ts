import { USER_NOT_FOUND } from '@/app/api/const/errors';
import { auth } from '@/app/api/lib/getAuth';

const findUserByEmail = async (email: string) => {
  return auth.getUserByEmail(email).catch((err) => {
    if (err.code === USER_NOT_FOUND) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }
    throw err;
  });
};

export default findUserByEmail;
