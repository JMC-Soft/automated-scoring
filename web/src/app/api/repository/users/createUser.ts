import { RegisterDto } from '@/app/api/dtos';
import {
  EMAIL_ALREADY_EXISTS,
  INVALID_DISPLAY_NAME,
  INVALID_EMAIL,
  WEAK_PASSWORD,
} from '@/app/api/const/errors';
import { auth } from '@/app/api/lib/getAuth';

const createUser = async ({ email, password, nickName }: RegisterDto) => {
  const user = await auth
    .createUser({
      email,
      password,
      displayName: nickName,
    })
    .catch((err) => {
      if (err.code === EMAIL_ALREADY_EXISTS)
        throw new Error('이미 존재하는 이메일입니다');
      if (err.code === INVALID_EMAIL)
        throw new Error('유효하지 않은 이메일입니다');
      if (err.code === WEAK_PASSWORD)
        throw new Error('비밀번호 형식이 올바르지 않습니다.');
      if (err.code === INVALID_DISPLAY_NAME)
        throw new Error('유효하지 않은 닉네임입니다');

      throw err;
    });

  return user;
};

export default createUser;
