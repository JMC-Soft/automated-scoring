import { EMAIL_REG_EXP } from '@/lib/utils/constants';

export const isEmail = (email: string) => {
  return EMAIL_REG_EXP.test(email);
};

export const handleFetchError = (error: unknown, set: Function) => {
  if (error instanceof Error) {
    set({ error: error.message });
  }

  set({ error: '알 수 없는 에러가 발생했습니다.' });
};
