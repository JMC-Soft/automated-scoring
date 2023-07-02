import { initializeApp, getApps } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

import applicationDefault = credential.applicationDefault;

const firebaseAdmin = {
  credential: applicationDefault(),
};

/**
 * 환경 설정 참고 : https://firebase.google.com/docs/admin/setup?hl=ko#windows
 */

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseAdmin) : getApps()[0];

export default firebaseApp;
