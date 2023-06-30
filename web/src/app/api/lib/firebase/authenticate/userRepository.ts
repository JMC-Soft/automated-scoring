import { getAuth } from 'firebase-admin/auth';
import firebaseApp from '@/app/api/lib/firebase/config';

const auth = getAuth(firebaseApp);

const findUserByEmail = (email: string) => {
  return auth
    .getUserByEmail(email)
    .then((userRecord) => {
      return userRecord;
    })
    .catch((err) => {
      throw err;
    });
};

const createUser = async ({
  email,
  password,
  nickName,
}: {
  email: string;
  password: string;
  nickName: string;
}) => {
  return auth
    .createUser({
      email,
      password,
      displayName: nickName,
    })
    .then((userRecord) => {
      return userRecord;
    })
    .catch((err) => {
      throw err;
    });
};

export { findUserByEmail, createUser };
