import { User } from '@firebase/auth';
import ApiError from '@/app/api/lib/class/ApiError';

const getUserToken = async (userCredential: User) => {
  try {
    const user = await userCredential.getIdToken();

    return user;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default getUserToken;
