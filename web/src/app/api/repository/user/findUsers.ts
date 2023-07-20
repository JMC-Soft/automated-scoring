import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const findUsers = async () => {
  try {
    const query = db.collection('UserInfo').orderBy('createdAt', 'desc');
    const result = await query.get();
    const res = result.docs;

    if (!res) {
      throw new ApiError(
        `유저를 불러오지 못함`,
        404,
        '유저 정보를 불러오는데 실패했습니다.',
      );
    }

    return res;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findUsers;
