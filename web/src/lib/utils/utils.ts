import { EMAIL_REG_EXP } from '@/lib/constants/constants';

export const isEmail = (email: string) => {
  return EMAIL_REG_EXP.test(email);
};

export const handleFetchError = (error: Error, set: Function) => {
  set({ error: error.message });
  throw error;
};
