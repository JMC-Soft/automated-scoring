import { getAuth } from 'firebase/auth';
import clientApp from '@/app/api/config/firebase.client';

const clientAuth = getAuth(clientApp);

export default clientAuth;
