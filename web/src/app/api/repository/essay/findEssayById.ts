import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';
import { EssayEntitiy } from '@/app/api/lib/types';

const findEssayById = async (essayId: string): Promise<EssayEntitiy> => {
  try {
    const doc = db.collection('Essay').doc(essayId);
    const subDoc = db
      .collection('Essay')
      .doc(essayId)
      .collection('ScoringResult')
      .doc('total');
    const result = await doc.get();
    const res = result.data() as EssayEntitiy;

    if (!res) {
      throw new ApiError(
        `${essayId}에 해당하는 essay를 찾을 수 없음`,
        404,
        '제출 답안을 찾을 수 없습니다.',
      );
    }

    return res;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findEssayById;
