import { NextRequest } from 'next/server';
import { auth } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

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
