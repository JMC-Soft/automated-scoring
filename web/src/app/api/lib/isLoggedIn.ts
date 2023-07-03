import { ID_TOKEN_EXPIRED, INVALID_CREDENTIAL } from '@/app/api/const/errors';
import auth from '@/app/api/lib/auth';

const isLoggedIn = async (idToken: string) => {
  const decodedToken = await auth.verifyIdToken(idToken).catch((err) => {
    if (err.code === ID_TOKEN_EXPIRED)
      throw new Error('토큰이 만료되었습니다.');
    if (err.code === INVALID_CREDENTIAL)
      throw new Error('토큰 정보가 유효하지 않습니다.');

    throw err;
  });

  // email_verified 함수를 이용해 boolean으로 받을 수있지만
  // 함수의 재사용성을 고려해 email을 반환하도록 함
  // return decodedToken.email_verified;
  return decodedToken.email;
};

export default isLoggedIn;
