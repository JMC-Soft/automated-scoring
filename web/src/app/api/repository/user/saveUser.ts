import { UserAdditionInfo } from '@/app/api/lib/types';
import { db } from '@/app/api/config/firebase.admin';

const saveUser = async (
  { gender, schoolName }: UserAdditionInfo,
  uid?: string,
) => {
  const doc = db.collection('User').doc(uid ?? '');
  await doc.set({ gender, schoolName, uid });

  return { doc };
};

export default saveUser;
