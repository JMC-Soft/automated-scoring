import { NextRequest } from 'next/server';
import { auth } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

/**
 * TODO: refresh token과 함께 재검증 로직 추가
 */
const getDecodedToken = async (req: NextRequest) => {
  try {
    const idToken = req.cookies.get('idToken');

    if (!idToken) {
      return null;
    }

    const decodedToken = await auth.verifyIdToken(idToken.value);

    return decodedToken;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default getDecodedToken;
