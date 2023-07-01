import { initializeApp, getApps } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import {
  getApps as clientGet,
  initializeApp as clientInit,
} from 'firebase/app';
import applicationDefault = credential.applicationDefault;

const clientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJEC_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const clientApp =
  clientGet().length === 0 ? clientInit(clientConfig) : clientGet()[0];

/**
 * 환경 설정 참고 : https://firebase.google.com/docs/admin/setup?hl=ko#windows
 */

// const serviceAccount =
//   'C:\\Users\\sgbee\\Desktopauto-scoring-14fee-firebase-adminsdk-ir352-2e0fdf459a.json';

const firebaseConfig = {
  credential: applicationDefault(),
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
