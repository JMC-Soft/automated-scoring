import { getAuth } from 'firebase-admin/auth';
import { firebaseApp } from '@/app/api/lib/firebase/config';

const auth = getAuth(firebaseApp);

const findUserByEmail = async (email: string) => {
  return auth.getUserByEmail(email).catch((err) => {
    if (err.code === 'auth/user-not-found') {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }
    throw err;
  });
};

export default findUserByEmail;
