export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://automated-scoring.vercel.app/api/v1'
    : 'http://127.0.0.1:3000/api/v1';
