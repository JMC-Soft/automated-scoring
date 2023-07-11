import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { EssayEntitiy } from '@/app/api/lib/types';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';

const saveEssay = async (
  essayText: string,
  topic: string,
  type: string,
  uid: string | null,
) => {
  try {
    const doc = db.collection('Essay').doc();

    const essay: EssayEntitiy = {
      essayText,
      topic,
      type,
      uid,
      createdAt: makeCreatedAt(),
    };

    await doc.set(essay);

    return { doc, essay };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveEssay;
