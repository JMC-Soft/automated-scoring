import { getAuth as clientGetAuth } from '@firebase/auth';
import clientApp from '@/app/api/config/firebase.client';

const clientAuth = clientGetAuth(clientApp);

export default clientAuth;
