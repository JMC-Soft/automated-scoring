import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { EvaluateResponseDto, ScoringResultEntity } from '@/app/api/lib/types';

const saveScoringResult = async (
  evaluateRes: EvaluateResponseDto,
  uid: string | null,
  docId: string,
) => {
  try {
    const doc = db.collection('ScoringResult').doc(docId);

    const scoringResult: ScoringResultEntity = {
      ...evaluateRes,
      uid,
    };

    await doc.set(scoringResult);

    return { doc, scoringResult };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveScoringResult;
