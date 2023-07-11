export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://automated-scoring.vercel.app/api/v1'
    : 'http://localhost:3000/api/v1';

export const EMAIL_REG_EXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
