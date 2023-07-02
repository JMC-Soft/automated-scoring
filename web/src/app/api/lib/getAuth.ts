import { getAuth } from 'firebase-admin/auth';
import { getAuth as clientGetAuth } from 'firebase/auth';
import { firebaseApp, clientApp } from '@/app/api/config/firebase';

export const auth = getAuth(firebaseApp);
export const clientAuth = clientGetAuth(clientApp);
