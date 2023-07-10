import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { EssayEntitiy } from '@/app/api/lib/types';

const saveEssay = async ({ essayText, topic, type, uid }: EssayEntitiy) => {
  try {
    const doc = db.collection('Essay').doc();

    await doc.set({
      essayText,
      topic,
      type,
      uid,
    });

    return doc.id;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveEssay;
