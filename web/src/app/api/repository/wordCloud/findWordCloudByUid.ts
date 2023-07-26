import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const findWordCloudByUid = async (uid: string) => {
  try {
    const doc = db.collection('WordCloud').where('uid', '==', uid);
    const result = await doc.get();
    const res = result.docs;

    if (!res) {
      return null;
    }

    return res;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findWordCloudByUid;
