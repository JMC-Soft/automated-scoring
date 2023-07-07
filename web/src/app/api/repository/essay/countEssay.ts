import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';

const countEssay = async () => {
  try {
    const essayColRef = db.collection('Essay');
    const snapshot = await essayColRef.get();

    return snapshot.size;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default countEssay;
