import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';

const findUserInfoByEmail = async (email: string) => {
  try {
    const doc = db.collection('UserInfo').where('email', '==', email);

    const result = await doc.get();
    const res = result.docs[0];
    if (!res) {
      throw new ApiError(
        `email: ${email}에 해당하는 결과가 존재하지 않음`,
        404,
        '유저 정보를 찾을 수 없습니다.',
      );
    }

    return res;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findUserInfoByEmail;
