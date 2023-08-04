const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.ebapasta.com/api/v1'
    : 'http://127.0.0.1:3000/api/v1';

export default API_BASE_URL;
