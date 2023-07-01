import { getAuth } from 'firebase-admin/auth';
import { firebaseApp } from '@/app/api/lib/firebase/config';
import { RegisterDto } from '@/app/api/dtos';

const auth = getAuth(firebaseApp);

const createUser = async ({ email, password, nickName }: RegisterDto) => {
  return auth
    .createUser({
      email,
      password,
      displayName: nickName,
    })
    .catch((err) => {
      if (err.code === 'auth/email-already-exists')
        throw new Error('이미 존재하는 이메일입니다');
      if (err.code === 'auth/invalid-email')
        throw new Error('유효하지 않은 이메일입니다');
      if (err.code === 'auth/weak-password')
        throw new Error('비밀번호 형식이 올바르지 않습니다.');
      if (err.code === 'auth/invalid-display-name')
        throw new Error('유효하지 않은 닉네임입니다');

      throw err;
    });
};

export default createUser;
