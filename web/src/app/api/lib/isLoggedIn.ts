import { auth } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const isLoggedIn = async (idToken: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);

    return decodedToken.email;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default isLoggedIn;
