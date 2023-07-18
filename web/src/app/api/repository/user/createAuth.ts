import { UserAuth } from '@/app/api/lib/types';
import { auth } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const createAuth = async ({ email, password, nickname }: UserAuth) => {
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

export default createAuth;
