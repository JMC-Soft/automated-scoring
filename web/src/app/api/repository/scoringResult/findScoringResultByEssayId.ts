import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const findScoringResultByEssayId = async (essayId: string) => {
  try {
    const doc = db.collection('ScoringResult').doc(essayId);

    const result = await doc.get();

    if (!result.exists)
      throw new ApiError(
        'essayId에 해당하는 결과가 존재하지 않음',
        404,
        '채점 결과가 존재하지 않습니다.',
      );

    return result.data();
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findScoringResultByEssayId;
