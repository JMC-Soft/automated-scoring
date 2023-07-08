import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';

const countEssay = async () => {
  try {
    const snapshot = await db.collection('Essay').get();

    return snapshot.size;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default countEssay;
