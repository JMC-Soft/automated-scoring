import { UserInfo } from '@/app/api/lib/types';
import { db } from '@/app/api/config/firebase.admin';
import ApiError from '@/app/api/lib/class/ApiError';

const saveUserInfo = async ({
  uid,
  email,
  nickname,
  gender,
  schoolName,
  createdAt,
}: UserInfo) => {
  try {
    const doc = db.collection('UserInfo').doc(uid);

    await doc.set({ uid, email, nickname, gender, schoolName, createdAt });

    return { doc };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveUserInfo;
