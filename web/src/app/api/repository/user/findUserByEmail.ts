import { USER_NOT_FOUND } from '@/app/api/const/errors';
import auth from '@/app/api/lib/auth';

const findUserByEmail = async (email: string) => {
  const user = await auth.getUserByEmail(email).catch((err) => {
    if (err.code === USER_NOT_FOUND) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }
    throw err;
  });

  return user;
};

export default findUserByEmail;
