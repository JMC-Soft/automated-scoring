import {
  signInWithEmailAndPassword,
  getAuth as clientGetAuth,
} from 'firebase/auth';
import { clientApp } from '@/app/api/lib/firebase/config';
import { LoginDto } from '@/app/api/dtos';

const clientAuth = clientGetAuth(clientApp);

const findUserByEmailAndPassword = async ({ email, password }: LoginDto) => {
  // 오류 목록 참고 : https://firebase.google.com/docs/reference/js/auth?hl=ko#autherrorcodes
  const userCredential = await signInWithEmailAndPassword(
    clientAuth,
    email,
    password,
  ).catch((err) => {
    if (err.code === 'auth/wrong-password') {
      throw new Error('패스워드가 잘못되었습니다.');
    }
    if (err.code === 'auth/user-not-found') {
      throw new Error('유저 정보가 없습니다.');
    }
    throw err;
  });

  return userCredential.user;
};

export default findUserByEmailAndPassword;
