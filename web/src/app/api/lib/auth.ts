import { getAuth } from 'firebase-admin/auth';
import { firebaseApp } from '@/app/api/config/firebase.admin';

const auth = getAuth(firebaseApp);

export default auth;
