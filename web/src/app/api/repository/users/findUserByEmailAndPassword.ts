import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginDto } from '@/app/api/lib/types';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '@/app/api/const/errors';
import clientAuth from '@/app/api/lib/clientAuth';

const findUserByEmailAndPassword = async ({ email, password }: LoginDto) => {
  const userCredential = await signInWithEmailAndPassword(
    clientAuth,
    email,
    password,
  ).catch((err) => {
    if (err.code === WRONG_PASSWORD) {
      throw new Error('패스워드가 잘못되었습니다.');
    }
    if (err.code === USER_NOT_FOUND) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }
    throw err;
  });

  return userCredential.user;
};

export default findUserByEmailAndPassword;
