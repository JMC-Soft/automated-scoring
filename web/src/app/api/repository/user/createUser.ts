import { RegisterDto } from '@/app/api/lib/types';
import { auth } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const createUser = async ({ email, password, nickname }: RegisterDto) => {
  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: nickname,
    });

    return user;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default createUser;
