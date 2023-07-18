import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { ScoringResultEntity } from '@/app/api/lib/types';

const saveScoringResult = async (
  scoringResult: ScoringResultEntity,
  docId?: string,
) => {
  try {
    const doc = docId
      ? db.collection('ScoringResult').doc(docId)
      : db.collection('ScoringResult').doc();

    await doc.set(scoringResult);

    return { doc, scoringResult };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveScoringResult;
