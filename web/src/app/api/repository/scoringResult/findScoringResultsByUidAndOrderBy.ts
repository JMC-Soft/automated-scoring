import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const findScoringResultsByUidAndOrderBy = async ({
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
  const query = db
    .collection('ScoringResult')
    .where('uid', '==', uid)
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

export default findScoringResultsByUidAndOrderBy;
