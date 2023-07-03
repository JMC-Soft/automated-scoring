import { db } from '@/app/api/config/firebase.admin';

const getDocRef = (collection: string, document: string) => {
  return db.collection(collection).doc(document);
};

export default getDocRef;
