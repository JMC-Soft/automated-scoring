import EMAIL_REG_EXP from '@/lib/constants/regExp';

const isEmail = (email: string) => {
  return EMAIL_REG_EXP.test(email);
};

export default isEmail;
