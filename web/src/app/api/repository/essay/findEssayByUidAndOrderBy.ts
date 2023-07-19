import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const findEssayByUidAndOrderBy = async ({
  uid,
  orderBy,
  orderType,
  N,
}: {
  uid: string;
  orderBy: string;
  orderType: 'asc' | 'desc';
  N?: number;
}) => {
  /**
   * todo: .where('scoringResult', '!=', null) 구문 실행 여부 확인
   */
  const query = db
    .collection('Essay')
    .where('uid', '==', uid)
    .where('scoringResult', '!=', null)
    .orderBy(orderBy, orderType);

  const doc = N ? query.limit(N) : query;
  const result = await doc.get();
  const res = result.docs;

  if (!res) {
    throw new ApiError(
      `uid: ${uid}에 해당하는 결과가 존재하지 않음`,
      404,
      '채점 결과가 존재하지 않습니다.',
    );
  }

  return res;
};

export default findEssayByUidAndOrderBy;
