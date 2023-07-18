import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';
import { ScoringResultEntity } from '@/app/api/lib/types';

const findScoringResultByEssayId = async (
  essayId: string,
): Promise<ScoringResultEntity> => {
  try {
    const doc = db.collection('ScoringResult').doc(essayId);
    const result = await doc.get();
    const res = result.data() as ScoringResultEntity;

    if (!res)
      throw new ApiError(
        `${essayId}에 해당하는 결과가 존재하지 않음`,
        404,
        '채점 결과가 존재하지 않습니다.',
      );

    return res;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findScoringResultByEssayId;
