import { db } from '@/app/api/config/firebase.admin';

const getColRef = (collection: string) => {
  return db.collection(collection);
};

export default getColRef;
