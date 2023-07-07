import { initializeApp, getApps } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdmin = {
  credential: credential.cert({
    projectId: process.env.ADMIN_PROJECT_ID,
    clientEmail: process.env.ADMIN_CLIENT_EMAIL,
    privateKey: (process.env.ADMIN_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  }),
};

/**
 * 환경 설정 참고 : https://firebase.google.com/docs/admin/setup?hl=ko#windows
 */

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseAdmin) : getApps()[0];

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default firebaseApp;
export { auth, db };
