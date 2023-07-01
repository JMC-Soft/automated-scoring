import { getAuth } from 'firebase-admin/auth';
import { firebaseApp } from '@/app/api/lib/firebase/config';

const auth = getAuth(firebaseApp);

const isLoggedIn = async (idToken: string) => {
  const decodedToken = await auth.verifyIdToken(idToken).catch((err) => {
    if (err.code === 'auth/id-token-expired')
      throw new Error('토큰이 만료되었습니다.');
    if (err.code === 'auth/invalid-credential')
      throw new Error('토큰 정보가 유효하지 않습니다.');

    throw err;
  });

  // email_verified 함수를 이용해 boolean으로 받을 수있지만
  // 함수의 재사용성을 고려해 email을 반환하도록 함
  // return decodedToken.email_verified;
  return decodedToken.email;
};

export default isLoggedIn;
