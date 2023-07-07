import { auth } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const findUserByEmail = async (email: string) => {
  try {
    const user = await auth.getUserByEmail(email);

    return user;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findUserByEmail;
