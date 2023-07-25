import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';
import { UserInfoEntity } from '@/app/api/lib/types';

const saveUserInfo = async ({
  uid,
  email,
  nickname,
  gender,
  schoolName,
  createdAt,
}: UserInfoEntity) => {
  try {
    const doc = db.collection('UserInfo').doc(uid);

    await doc.set({ uid, email, nickname, gender, schoolName, createdAt });

    return { doc };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveUserInfo;
