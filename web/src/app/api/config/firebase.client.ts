import {
  getApps as clientGet,
  initializeApp as clientInit,
} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const clientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJEC_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const clientApp =
  clientGet().length === 0 ? clientInit(clientConfig) : clientGet()[0];
const clientAuth = getAuth(clientApp);

export { clientAuth };
export default clientApp;
