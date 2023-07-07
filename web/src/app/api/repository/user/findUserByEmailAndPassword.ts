import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginDto } from '@/app/api/lib/types';
import ApiError from '@/app/api/lib/class/ApiError';
import { clientAuth } from '@/app/api/config/firebase.client';

const findUserByEmailAndPassword = async ({ email, password }: LoginDto) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password,
    );

    return userCredential.user;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default findUserByEmailAndPassword;
