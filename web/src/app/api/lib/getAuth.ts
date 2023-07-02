import { getAuth } from 'firebase-admin/auth';
import { getAuth as clientGetAuth } from 'firebase/auth';
import firebaseApp from '@/app/api/config/firebase.admin';
import clientApp from '@/app/api/config/firebase.client';

export const auth = getAuth(firebaseApp);
export const clientAuth = clientGetAuth(clientApp);
