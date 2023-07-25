import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { EssayEntity } from '@/app/api/lib/types';

const saveEssay = async (essay: EssayEntity, docId?: string) => {
  try {
    const doc = docId
      ? db.collection('Essay').doc(docId)
      : db.collection('Essay').doc();

    await doc.set(essay);

    return { doc, essay };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveEssay;
