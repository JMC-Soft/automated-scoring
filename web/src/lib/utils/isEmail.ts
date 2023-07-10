import { EMAIL_REG_EXP } from '@/lib/constants/constants';

const isEmail = (email: string) => {
  return EMAIL_REG_EXP.test(email);
};

export default isEmail;
